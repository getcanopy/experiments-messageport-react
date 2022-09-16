import React, { Component, ComponentType } from "react"

type StuffWithoutPort = Omit<object, 'port'>
export const withPort = (ThingToWrap: ComponentType<StuffWithoutPort>) => {
  return class extends Component<StuffWithoutPort & {port:MessagePort}> {
    port: MessagePort
    state: { props: StuffWithoutPort }
    constructor(props: StuffWithoutPort & {port:MessagePort}) {
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

