import { connect } from 'react-redux'

import { locations } from 'locations'
import { getRange } from 'modules/ui/selectors'
import { navigateTo } from 'modules/location/actions'

import Minimap from './Minimap'

const mapState = state => {
  const { nw, se } = getRange(state)
  return {
    minX: nw.x,
    minY: nw.y,
    maxX: se.x,
    maxY: se.y
  }
}

const mapDispatch = dispatch => ({
  onUpdate: (x, y) => dispatch(navigateTo(locations.parcelMapDetail(x, y)))
})

export default connect(mapState, mapDispatch)(Minimap)
