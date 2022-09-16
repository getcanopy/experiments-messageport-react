import React, { Component, ComponentType } from "react"

export const withPort = <P extends object>(ThingToWrap: ComponentType<P>) => {
  return class extends Component<P & {port:MessagePort}> {
    port: MessagePort
    state: { props: any }
    constructor(props: P & {port:MessagePort}) {
      super(props)
      const { port, ...rest } = props
      this.port = port
      this.state = { props: rest }
    }

    componentDidMount = () => {
      this.port.addEventListener('message', this.handleChange)
      this.port.start()
    }

    componentWillUnmount = () => {
      this.port.removeEventListener('message', this.handleChange)
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

