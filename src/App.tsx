import React from 'react'
import { PortPortal, usePortPortal } from './PortPortal'
import './App.css'

const { port1, port2 } = new MessageChannel()

const { port1: port3, port2: port4 } = new MessageChannel()

setInterval(() => {
  port2.postMessage({ greeting: `hello from time: ${Date.now()}` })
}, 100)

setInterval(() => {
  port2.postMessage({ bgColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` })
}, 1000)

setInterval(() => {
  port2.postMessage({ time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}` })
}, 100)

setInterval(() => {
  port4.postMessage({ message: 'Nested Yo!', color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` })
}, 500)

function App() {
  return (
    <PortPortal port={port1}>
      <HappyGreeting />
      <SomethingElse onClick={() => console.log('clicked')} />
      <AnothaOne />

      <PortPortal port={port3}>
        <ColorMessage />
      </PortPortal>
    </PortPortal>
  )
}

export default App

const HappyGreeting = () => {
  const { greeting, emoji } = usePortPortal()

  return (
    <div>
      <span>{emoji}</span>
      <span>{greeting}</span>
      <span>{emoji}</span>
    </div>
  )
}

const SomethingElse = ({ bgColor, onClick }: any) => {
  return (
    <div style={{ backgroundColor: bgColor }}>
      <button onClick={onClick}>Click me!</button>
    </div>
  )
}

const AnothaOne = ({ time }: any) => {
  return (
    <div>
      <span>{time}</span>
    </div>
  )
}

const ColorMessage = () => {
  return (
    <div>
      <NestedColorMessage1 />
    </div>
  )
}

const NestedColorMessage1 = () => {
  return (
    <div>
      <NestedColorMessage2 />
    </div>
  )
}

const NestedColorMessage2 = () => {
  return (
    <div>
      <NestedColorMessage3 />
    </div>
  )
}

const NestedColorMessage3 = () => {
  const { message, color } = usePortPortal()

  return (
    <div>
      <span style={{ color, fontSize: 36 }}>{message}</span>
    </div>
  )
}
