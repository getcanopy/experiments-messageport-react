import React, { ComponentType } from "react"
import { act, render } from "@testing-library/react"
import { PortPortal } from "./PortPortal"
import { MessageChannel } from 'worker_threads'

const awaitTimeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('PortPortal', () => {
  describe('Given an exciting emoji component', () => {
    let HappyEmoji: ComponentType<{ greeting: string, emoji: string }>
    beforeEach(() => {
      HappyEmoji = ({ greeting, emoji = '😀' }) => {
        return <div>
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
      describe('When the component is wrapped with PortPortal', () => {
        let element
        beforeEach(() => {
          element = <PortPortal port={emojiPort}>
            <HappyEmoji emoji='😎' greeting='sup bro' />
          </PortPortal>
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
      describe('When 2 components are wrapped with PortPortal', () => {
        let element
        beforeEach(() => {
          const SomeOtherComponent = ({time}) => <div>it's {time}o'clock</div>
          element = <PortPortal port={emojiPort}>
            <HappyEmoji key="whatever" emoji='😎' greeting='sup bro' />
            <SomeOtherComponent key='hi' time='loading...' />
          </PortPortal>
        })
        describe('When the component is rendered', () => {
          let rendered
          beforeEach(() => {
            rendered = render(element)
          })
          it('should render the wrapped component', () => {
            expect(rendered.container).toHaveTextContent('😎')
            expect(rendered.container).toHaveTextContent("it's loading...o'clock")
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
                backendPort.postMessage({ emoji: '🆒', time: 'party' })
                await awaitTimeout(0)
              })
            })
            it('should update the element emoji and greeting', () => {
              expect(rendered.container).toHaveTextContent('🆒')
              expect(rendered.container).toHaveTextContent("it's partyo'clock")
            })
          })
        })
      })
    })
  })
})
