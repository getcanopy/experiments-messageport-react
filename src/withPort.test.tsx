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
  describe('Given an exciting emoji component', () => {
    let HappyEmoji: ComponentType<{ greeting: string, emoji?: string, onClick: () => void }>
    beforeEach(() => {
      HappyEmoji = ({ greeting, emoji = '😀', onClick }) => {
        return <div onClick={onClick}>
          <span>{emoji}</span>
          <span>{greeting || 'no greeting'}</span>
          <span>{emoji}</span>
        </div>
      }
    })
    describe('Given a MessagePort', () => {
      let emojiPort
      let backendPort
      beforeEach(() => {
        const { port1, port2 } = new MessageChannel()
        emojiPort = port1
        backendPort = port2
      })
      describe('When the component is wrapped with withPort', () => {
        let PortHappyEmoji
        beforeEach(() => {
          PortHappyEmoji = withPort(HappyEmoji)
        })
        describe('When the component is rendered', () => {
          let rendered
          beforeEach(() => {
            rendered = render(<PortHappyEmoji greeting='hello' port={backendPort} />)
          })
          it('should render the wrapped component', () => {
            expect(rendered.container).toHaveTextContent('hello')
          })
        })
      })
      describe('when the backend sends a message', () => {
        let rendered
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
