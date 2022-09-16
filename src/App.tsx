import React from 'react'
import './App.css'
import { withPort } from './withPort'

const HappyGreeting = ({ greeting }) => {
  return <div>
    <span>😀</span>
    <span>{greeting}</span>
    <span>😀</span>
  </div>
}

const PortHappyGreeting = withPort(HappyGreeting)

const {port1, port2} = new MessageChannel()

setInterval(() => {
  port2.postMessage({greeting: `hello from time: ${Date.now()}`})
}, 100)

function App() {
  return (
    <div className="App">
      <PortHappyGreeting port={port1} greeting="begin"/>
    </div>
  )
}

export default App
