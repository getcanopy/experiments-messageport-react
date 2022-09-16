import React, { ComponentType } from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"
import { withPort } from "./index"
test("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

describe('withPort', () => {
  let HappyEmoji: ComponentType<any>
  beforeEach(() => {
    HappyEmoji = ({ greeting, emoji = '😀', onClick }) => {
      return <h1 onClick={onClick} style={{ padding: 100 }}>{emoji}{greeting || 'no greeting'}{emoji}</h1>
    }
  })
  it('should return something', () => {
    const PortHappyEmoji = withPort(HappyEmoji)
    render(<PortHappyEmoji />)
    expect(PortHappyEmoji).toBeDefined()
  })
})
