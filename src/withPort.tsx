import React, { Component, ComponentType } from "react"

export const withPort = (ThingToWrap: ComponentType<any>) => {
  return class extends Component {
    port: MessagePort
    state: { props: any }
    constructor(props: { port: MessagePort & any }) {
      super(props)
      const { port, ...rest } = props
      this.port = port
      this.state = { props: rest }
      this.port.addEventListener('message', this.handleChange)
    }
    componentDidMount = () => {
      this.port.start()
    }

    handleChange = ({data:props}) => {
      this.setState({ props: { ...this.state.props, ...props } })
    }

    render = () => {
      const {props} = this.state
      return <ThingToWrap {...props} />
    }
  }
}

