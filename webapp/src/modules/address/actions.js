// Fetch Address

export const FETCH_ADDRESS = 'Fetch Address'

export function fetchAddress(address) {
  return {
    type: FETCH_ADDRESS,
    address
  }
}

// Fetch Address Parcels

export const FETCH_ADDRESS_PARCELS_REQUEST = '[Request] Fetch Address Parcels'
export const FETCH_ADDRESS_PARCELS_SUCCESS = '[Success] Fetch Address Parcels'
export const FETCH_ADDRESS_PARCELS_FAILURE = '[Failure] Fetch Address Parcels'

export function fetchAddressParcelsRequest(address) {
  return {
    type: FETCH_ADDRESS_PARCELS_REQUEST,
    address
  }
}

export function fetchAddressParcelsSuccess(address, parcels) {
  return {
    type: FETCH_ADDRESS_PARCELS_SUCCESS,
    address,
    parcels
  }
}

export function fetchAddressParcelsFailure(address, error) {
  return {
    type: FETCH_ADDRESS_PARCELS_FAILURE,
    address,
    error
  }
}

// Fetch Address Contributions

export const FETCH_ADDRESS_CONTRIBUTIONS_REQUEST =
  '[Request] Fetch Address Contributions'
export const FETCH_ADDRESS_CONTRIBUTIONS_SUCCESS =
  '[Success] Fetch Address Contributions'
export const FETCH_ADDRESS_CONTRIBUTIONS_FAILURE =
  '[Failure] Fetch Address Contributions'

export function fetchAddressContributionsRequest(address) {
  return {
    type: FETCH_ADDRESS_CONTRIBUTIONS_REQUEST,
    address
  }
}

export function fetchAddressContributionsSuccess(address, contributions) {
  return {
    type: FETCH_ADDRESS_CONTRIBUTIONS_SUCCESS,
    address,
    contributions
  }
}

export function fetchAddressContributionsFailure(address, error) {
  return {
    type: FETCH_ADDRESS_CONTRIBUTIONS_FAILURE,
    address,
    error
  }
}

// Fetch Address Publications

export const FETCH_ADDRESS_PUBLICATIONS_REQUEST =
  '[Request] Fetch Address Publications'
export const FETCH_ADDRESS_PUBLICATIONS_SUCCESS =
  '[Success] Fetch Address Publications'
export const FETCH_ADDRESS_PUBLICATIONS_FAILURE =
  '[Failure] Fetch Address Publications'

export function fetchAddressPublicationsRequest(address) {
  return {
    type: FETCH_ADDRESS_PUBLICATIONS_REQUEST,
    address
  }
}

export function fetchAddressPublicationsSuccess(address, publications) {
  return {
    type: FETCH_ADDRESS_PUBLICATIONS_SUCCESS,
    address,
    publications
  }
}

export function fetchAddressPublicationsFailure(address, error) {
  return {
    type: FETCH_ADDRESS_PUBLICATIONS_FAILURE,
    address,
    error
  }
}
