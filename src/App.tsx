import React from 'react'
import './App.css'
import { PortPortal } from './PortPortal'

const HappyGreeting = ({ greeting }) => {
  return <div>
    <span>😀</span>
    <span>{greeting}</span>
    <span>😀</span>
  </div>
}

const SomethingElse = ({ bgColor, onClick }) => {
  return <div style={{ backgroundColor: bgColor }}>
    <button onClick={onClick}>Click me!</button>
  </div>
}
const { port1, port2 } = new MessageChannel()

setInterval(() => {
  port2.postMessage({ greeting: `hello from time: ${Date.now()}` })
}, 100)

setInterval(() => {
  port2.postMessage({ bgColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` })
}, 1000)

function App() {
  return (
    <div className="App">
      <PortPortal port={port1}>
        <HappyGreeting greeting='no greeting' />
        <SomethingElse bgColor='blue' onClick={() => console.log('clicked')} />
      </PortPortal>
    </div>
  )
}

export default App
