import React, { ReactElement, useEffect, useState, createContext, useContext } from "react"

type PortPortalData = Record<string, any>;

const PortPortalContext = createContext<PortPortalData>({})

export const usePortPortal = () => useContext(PortPortalContext)

interface PortPortalProps {
  port: MessagePort;
  children: ReactElement | ReactElement[];
}

export const PortPortal = ({ port, children }: PortPortalProps) => {
  const [props, setProps] = useState<Record<string, any>>({})

  const handleChange = ({ data }) => {
    setProps({ ...props, ...data })
  }

  useEffect(() => {
    port.addEventListener("message", handleChange)
    port.start()

    return () => {
      port.removeEventListener("message", handleChange)
    }
  }, [])

  return (
    <PortPortalContext.Provider value={props}>
      {children}
    </PortPortalContext.Provider>
  )
}
