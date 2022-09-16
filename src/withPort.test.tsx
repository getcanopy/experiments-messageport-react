import React, { ComponentType } from "react"
import { act, render } from "@testing-library/react"
import { MessageChannel, MessagePort } from 'worker_threads'
import { withPort } from "./withPort"

const awaitTimeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('withPort', () => {
  describe('Given an exciting emoji component', () => {
    let HappyEmoji: ComponentType<{ greeting: string, emoji: string, onClick: () => void }>
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
      let emojiPort: MessagePort
      let backendPort: MessagePort
      beforeEach(() => {
        const { port1, port2 } = new MessageChannel()
        emojiPort = port1
        backendPort = port2
      })
      describe('When a component that already has a "port" property is wrapped with withPort', () => {
        let WrappedComponent
        beforeEach(() => {
          const UnfortunateComponent = ({ port, whatever }) => <div>I want to talk about {port}. {whatever}</div>
          WrappedComponent = withPort(UnfortunateComponent as ComponentType<{whatever: string}>)
        })
        it('should not let us do that', () => {
          expect(() => {
            render(<WrappedComponent port={emojiPort} whatever="whatever" />)
          }).toThrow()
        })
      })
      describe('When the component is wrapped with withPort', () => {
        let PortHappyEmoji
        let element
        beforeEach(() => {
          PortHappyEmoji = withPort(HappyEmoji)
          element = <PortHappyEmoji emoji='😎' greeting='sup bro' port={emojiPort} />
        })
        describe('When the component is rendered', () => {
          let rendered
          beforeEach(() => {
            rendered = render(element)
          })
          it('should render the wrapped component', () => {
            expect(rendered.container).toHaveTextContent('😎')
            expect(rendered.container).toHaveTextContent('sup bro')
          })

          describe('when the backend sends a message', () => {
            beforeEach(async () => {
              await act(async () => {
                backendPort.postMessage({ emoji: '⭐' })
                await awaitTimeout(0)
              })
            })
            it('should update the element emoji', () => {
              expect(rendered.container).toHaveTextContent('⭐')
            })
            it('should not update the element greeting', () => {
              expect(rendered.container).toHaveTextContent('sup bro')
            })
          })
          describe('when the backend sends a different, cooler message', () => {
            beforeEach(async () => {
              await act(async () => {
                backendPort.postMessage({ emoji: '🆒', greeting: 'sup sis' })
                await awaitTimeout(0)
              })
            })
            it('should update the element emoji and greeting', () => {
              expect(rendered.container).toHaveTextContent('🆒')
              expect(rendered.container).toHaveTextContent('sup sis')
            })
          })
        })
      })
    })
  })
})
