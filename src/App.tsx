import React from 'react'
import './App.css'
import {PortPortal} from './PortPortal'
const HappyGreeting = ({ greeting }) => {
  return <div>
    <span>😀</span>
    <span>{greeting}</span>
    <span>😀</span>
  </div>
}


const {port1, port2} = new MessageChannel()

setInterval(() => {
  port2.postMessage({greeting: `hello from time: ${Date.now()}`})
}, 100)

function App() {
  return (
    <div className="App">
      <PortPortal port={port1}>
        <HappyGreeting greeting='no greeting' />
      </PortPortal>
    </div>
  )
}

export default App
