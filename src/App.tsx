import React from 'react'
import { PortPortal, usePortPortal } from './PortPortal'
import './App.css'

const { port1, port2 } = new MessageChannel()

setInterval(() => {
  port2.postMessage({ greeting: `hello from time: ${Date.now()}` })
}, 100)

setInterval(() => {
  port2.postMessage({ bgColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` })
}, 1000)

setInterval(() => {
  port2.postMessage({ time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}` })
}, 1000)

function App() {
  return (
    <PortPortal port={port1}>
      <HappyGreeting />
      <SomethingElse onClick={() => console.log('clicked')} />
      <AnothaOne />
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
