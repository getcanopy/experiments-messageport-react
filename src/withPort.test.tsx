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
  describe('Given a component', () => {
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
            rendered = render(<PortHappyEmoji greeting='hello' onClick={() => { }} port={backendPort} />)
          })
          it('should render something', () => {
            expect(rendered).toBeTruthy()
          })
          it('should render the wrapped component', () => {
            expect(screen.getByText('hello')).toBeTruthy()
          })
        })
      })
    })
  })
})/*
  describe('When I wrap it with withPort', () => {
    let PortHappyEmoji
    beforeEach(() => {
      PortHappyEmoji = withPort(HappyEmoji)
    })
  describe('Given a MessagePort', () => {
    let emojiPort
    let backendPort


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
*/
