import React, { ComponentType } from "react"
import { render, screen } from "@testing-library/react"
import { MessageChannel } from 'worker_threads'

import App from "./App"
import { withPort } from "./withPort"

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
  it('should render the component with the correct greeting', () => {
    const PortHappyEmoji = withPort(HappyEmoji)
    const rendered = render(<PortHappyEmoji greeting='hello' />)
    expect(rendered.container).toHaveTextContent('hello')
  })

  describe('Given a MessagePort', () => {
    let emojiPort
    let backendPort

    beforeEach(() => {
      const { port1, port2 } = new MessageChannel()
      emojiPort = port1
      backendPort = port2
    })
    describe('when wrapping an element type', () => {
      let PortHappyEmoji
      beforeEach(() => {
        PortHappyEmoji = withPort(HappyEmoji)
      })
      describe('when rendering the wrapped element', () => {
        let rendered
        beforeEach(() => {
          rendered = render(<PortHappyEmoji port={emojiPort} />)
        })
        it('should render the wrapped element', () => {
          expect(rendered.container).toHaveTextContent('😀no greeting😀')
        })
        describe('when the backend sends a message', () => {
          beforeEach(() => {
            backendPort.postMessage({ greeting: 'hello' })
          })
          it('should update the wrapped element', () => {
            expect(rendered.container).toHaveTextContent('😀hello😀')
          })
        })
      })
    })
  })
})
