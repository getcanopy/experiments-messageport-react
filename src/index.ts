import { ComponentType } from "react"

export const withPort = <T extends ComponentType>(thingToWrap:T):T=>{
  return thingToWrap
}

