import React, { Component, ComponentType } from "react"

export const withPort = (ThingToWrap: ComponentType<any>) => {
  return class extends Component {
    port: MessagePort
    state: { props: any }
    constructor(props: { port: MessagePort & any }) {
      super(props)
      this.id = Math.random()
      const { port, ...rest } = props
      this.port = port
      this.state = { props: rest }
      this.port.addEventListener('message', this.handleChange)
    }
    componentDidMount = () => {
      this.port.start()
      console.log("I mounted", this.id)
    }

    handleChange = ({data:props}) => {
      console.log('props', props, this.id)
      this.setState({ props: { ...this.state.props, emoji: '⭐' } })
    }

    render = () => {
      const {props} = this.state
      console.log('i rendered', this.id, props)
      return <ThingToWrap {...props} />
    }
  }
}

