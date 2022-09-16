import React, { Component, ComponentType } from "react"

export const withPort = (ThingToWrap: ComponentType) => {
  return class extends Component {
    port: MessagePort
    constructor(props: { port: MessagePort & any}) {
      super(props)
      this.port = props.port
      this.state = { props }
    }
    componentDidMount = () => {
      this.port.onmessage = this.handleChange
    }

    handleChange = (props) => this.setState({props: {...this.state.props, ...props }})

    render = () => {
      return <ThingToWrap {...this.props} />
    }
  }
}

