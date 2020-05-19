import React, { Component } from 'react'

export default class NumericEditor extends Component {
  constructor(props) {
    super(props)

    this.cancelBeforeStart =
      this.props.charPress && '1234567890'.indexOf(this.props.charPress) < 0

    let value = this.props.value
    if (!this.cancelBeforeStart && this.props.charPress) {
      value = value + this.props.charPress
    }
    this.state = {
      value,
      isSingle: true,
    }

    this.onKeyDown = this.onKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    let isSingle = this.props.node.data.isSingle
    this.setState({ isSingle: isSingle })
    this.refs.input.addEventListener('keydown', this.onKeyDown)
    this.refs.input.addEventListener('keyup', this.onKeyUp)
    this.focus()
  }

  componentDidUpdate() {
    this.focus()
  }

  componentWillUnmount() {
    this.refs.input.removeEventListener('keydown', this.onKeyDown)
    this.refs.input.removeEventListener('keyup', this.onKeyUp)
  }

  focus() {
    setTimeout(() => {
      this.refs.input.focus()
      this.refs.input.setSelectionRange(
        this.state.value.length,
        this.state.value.length
      )
    })
  }

  getValue() {
    return this.state.value
  }

  isCancelBeforeStart() {
    return this.cancelBeforeStart
  }

  // will reject the number if it greater than 1,000,000
  // not very practical, but demonstrates the method.
  isCancelAfterEnd() {
    return this.state.value > 1000000
  }

  onKeyUp = (event) => {
    let gridApi = this.props.api
    let colId = this.props.column.colId
  

    if (this.state.isSingle) {
      if (!!/\d/.test(event.key)) {
        if (colId === 'h18') {
          gridApi.stopEditing(false)
        } else {
          gridApi.tabToNextCell()
          let gridCell = gridApi.getFocusedCell()
          gridApi.rowRenderer.startEditingCell(gridCell, null, null)
        }
      
      }
    }
  }

  onKeyDown(event) {
  
    let key = event.key
      if (this.isLeftOrRight(event)) {
      event.stopPropagation()
      return
    }
    let notIsBack = !(key ==='Backspace')
  
    if (!this.isKeyPressedNumeric(event) && notIsBack) {
      if (event.preventDefault) event.preventDefault()
    }
  }

  isLeftOrRight(event) {
    return [37, 39].indexOf(event.keyCode) > -1
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  getCharCodeFromEvent(event) {
    event = event || window.event
    return typeof event.which === 'undefined' ? event.keyCode : event.which
  }

  isCharNumeric(charStr) {
    return !!/\d/.test(charStr)
  }

  isKeyPressedNumeric(event) {
    const charCode = this.getCharCodeFromEvent(event)
    const charStr = event.key ? event.key : String.fromCharCode(charCode)
    return this.isCharNumeric(charStr)
  }

  render() {
    return (
      <input
        ref='input'
        type='tel'
        value={this.state.value}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      />
    )
  }
}
