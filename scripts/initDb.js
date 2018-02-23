#!/usr/bin/env babel-node

import { execSync } from 'child_process'
import { Log, cli } from 'decentraland-commons'

import { db } from '../src/database'
import { Parcel } from '../src/Parcel'
import { District } from '../src/District'
import { Contribution } from '../src/Contribution'
import { renewBlockchainData } from './renewBlockchainData'
import { loadEnv, resolve } from './utils'

const log = new Log('init')
const runpsql = filename => `psql $CONNECTION_STRING -f ${resolve(filename)}`

export async function initializeDatabase() {
  const shouldContinue = await cli.confirm(
    `Careful! this will DROP 'parcel_states', 'projects', 'district_entries'
and reset the current 'parcels', 'districts', 'contributions' tables.
Do you wish to continue?`
  )
  if (!shouldContinue) return process.exit()

  log.info('Connecting database')
  await db.connect()

  log.info('Initializing state')
  execSync(runpsql('./drop.sql'))
  await Promise.all(
    [Parcel, District, Contribution].map(Model => db.truncate(Model.tableName))
  )

  log.info('Dumping parcel_states')
  execSync(runpsql('../dumps/parcel_states.20180105.sql'))

  log.info('Dumping projects')
  execSync(runpsql('../dumps/projects.20180105.sql'))

  log.info('Dumping district_entries')
  execSync(runpsql('../dumps/districts.20180105.sql'))

  log.info('Normalizing names for new model')
  await normalizeParcelStates()
  await normalizeDistrictEntries()
  await normalizeProjects()

  log.info('Dropping leftover tables')
  execSync(runpsql('./drop.sql'))

  const shouldUpdate = await cli.confirm(
    'Do you want to update the database to the last data found on the blockchain?'
  )

  if (shouldUpdate) {
    await renewBlockchainData()
  }

  log.info('All done!')
  process.exit()
}

async function normalizeParcelStates() {
  const parcelStates = await db.query('SELECT * FROM parcel_states')

  log.info(
    `Normalizing ${
      parcelStates.length
    } parcel_states. This might take a while...`
  )

  for (const parcelState of parcelStates) {
    await Parcel.insert({
      id: parcelState.id,
      x: parcelState.x,
      y: parcelState.y,
      auction_price: parcelState.amount,
      district_id: parcelState.projectId,
      created_at: parcelState.createdAt,
      updated_at: parcelState.updatedAt
    })
  }
}

async function normalizeDistrictEntries() {
  const districtEntries = await db.query('SELECT * FROM district_entries')

  log.info(
    `Normalizing ${
      districtEntries.length
    } district_entries. This might take a while...`
  )

  for (const districtEntry of districtEntries) {
    await Contribution.insert({
      id: districtEntry.id,
      address: districtEntry.address,
      district_id: districtEntry.project_id,
      land_count: districtEntry.lands,
      timestamp: districtEntry.userTimestamp,
      created_at: districtEntry.createdAt,
      updated_at: districtEntry.updatedAt
    })
  }
}

async function normalizeProjects() {
  const projects = await db.query('SELECT * FROM projects')

  log.info(
    `Normalizing ${projects.length} projects. This might take a while...`
  )

  for (const project of projects) {
    await District.insert({
      id: project.id,
      name: project.name,
      description: project.desc,
      link: project.link,
      public: project.public,
      parcel_count: project.parcels,
      priority: project.priority,
      center: project.lookup,
      disabled: project.disabled,
      created_at: project.createdAt,
      updated_at: project.updatedAt
    })
  }

  return await District.db.query(`
    UPDATE districts PJ
      SET parcel_ids = (
        SELECT ARRAY_AGG(P.id)
          FROM parcels P
          WHERE P.district_id = PJ.id
      );
  `)
}

if (require.main === module) {
  loadEnv()

  Promise.resolve()
    .then(initializeDatabase)
    .catch(console.error)
}
