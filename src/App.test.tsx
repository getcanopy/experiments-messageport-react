import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"
import { withPort } from "./index"
test("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

describe('withPort', () => {
  let HappyEmoji
  beforeEach(() => {
    HappyEmoji = ({ greeting, emoji = '😀', onClick }) => {
      return <h1 onClick={onClick} style={{ padding: 100 }}>{emoji}{greeting || 'no greeting'}{emoji}</h1>
    }
  })
  it('should render', () => {
    const PortHappyEmoji = withPort(HappyEmoji)
    expect(PortHappyEmoji).toBeDefined()
  })
})
