import React from 'react'

export default class extends React.Component {
  constructor () {
    super()
    this.state = {message: 'hello'}
  }
  componentDidMount () {
    setTimeout( () => this.setState({message: 'hello world'}), 1000)
  }
  render () {
    return <div>{this.state.message}</div>
  }
}
