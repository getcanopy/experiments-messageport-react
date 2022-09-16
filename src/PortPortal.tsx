import React, { ReactElement } from "react"

class PortPortal extends React.Component<{ port: MessagePort, children: ReactElement | ReactElement[] }> {
  port: MessagePort
  state: { props: any }
  constructor(props) {
    super(props)
    const { port } = props
    this.port = port
    this.state = { props: {} }
  }
  componentDidMount = () => {
    this.props.port.addEventListener("message", this.handleChange)
    this.props.port.start()
  }
  componentWillUnmount = () => {
    this.props.port.removeEventListener("message", this.handleChange)
  }
  handleChange = ({ data: props }) => {
    this.setState({ props: { ...this.state.props, ...props } })
  }
  render = () => {
    const { children } = this.props
    return React.Children.map(children, (child) => React.cloneElement(child, this.state.props))
  }
}
export { PortPortal }
