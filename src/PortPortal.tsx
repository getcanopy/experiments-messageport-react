import React from "react";

class PortPortal extends React.Component<{ port: MessagePort, children: any }> {
  port: MessagePort
  state: { props: any }
  constructor(props) {
    super(props)
    this.port = props.port
    this.state = { props }
  }
  componentDidMount = () => {
    this.props.port.addEventListener("message", this.handleChange);
    this.props.port.start()
  }
  componentWillUnmount = () => {
    this.props.port.removeEventListener("message", this.handleChange);
  }
  handleChange = ({ data: props }) => {
    this.setState({ props: { ...this.state.props, ...props } });
  }
  render = () => {
    const { children } = this.props
    return <div>{children}</div>
  }
}
export { PortPortal }
