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
      return <div onClick={onClick}>
        <span>{emoji}</span>
        <span>{greeting || 'no greeting'}</span>
        <span>{emoji}</span>
      </div>
    }
  })
  it('should return something', () => {
    const PortHappyEmoji = withPort(HappyEmoji)
    render(<PortHappyEmoji />)
    expect(PortHappyEmoji).toBeDefined()
  })
  describe('When passed a "greeting" property', () => {
    it('should render the greeting', () => {
      const PortHappyEmoji = withPort(HappyEmoji)
      render(<PortHappyEmoji greeting="hello" />)
      expect(screen.getByText('hello')).toBeInTheDocument()
    })
  })
})
