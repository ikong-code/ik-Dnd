import React from 'react'
import { IDndManager } from './type'

const defaultContext: IDndManager = {
  dropMode: 'move',
  sourceMap: {},
  targetMap: {},
  changeResult: console.log,
  addSource: console.log,
  removeSource: console.log,
  addTarget: console.log,
  removeTarget: console.log,
}

export const DndManagerContext = React.createContext<IDndManager>(defaultContext)
