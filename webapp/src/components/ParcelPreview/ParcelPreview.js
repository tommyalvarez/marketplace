import React from 'react'
import PropTypes from 'prop-types'
import { AutoSizer } from 'react-virtualized'
import ParcelCanvas from './ParcelCanvas'

export default class ParcelPreview extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    size: 20
  }

  render() {
    return (
      <AutoSizer>
        {props => <ParcelCanvas {...props} {...this.props} />}
      </AutoSizer>
    )
  }
}
