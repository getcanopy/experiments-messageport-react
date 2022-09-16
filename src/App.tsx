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

function App() {
  return (
    <div className="App">
      <header className="App-header"> Let's control the emoji from the backend! </header>
      <form>
        <label> Emoji: </label>
        <input type="text" />
      </form>
      <PortHappyGreeting port={port1} greeting="begin"/>
    </div>
  )
}

export default App
