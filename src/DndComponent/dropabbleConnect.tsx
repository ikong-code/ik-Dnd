import React from 'react'
import { IDndManager, targetId } from '../DndManager/type'
import { cloneDeep } from 'lodash'

function dropabbleConnect(
  element: React.ReactElement,
  targetId: targetId,
  dndManager: IDndManager,
  targetInfo: any
): React.ReactElement {
  const tarInfo = cloneDeep(targetInfo)
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode

    const { targetMap = {} } = dndManager
    let targetDOMId = null
    // todo fix path
    // @ts-ignore
    e.nativeEvent.path.some(i => {
      const targetDOM = i.dataset?.dragid
      for (let item in targetMap) {
        if (targetMap[item] === targetDOM) {
          targetDOMId = item
          return true
        }
      }
    })
    // set targetId
    if (targetId !== targetDOMId) return
    dndManager.changeResult({
      targetId: targetDOMId,
      targetInfo: tarInfo,
    })
  }

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode
    // 判断comp path最顶层的dom 当初 targetId
    // const targetDOM = e.nativeEvent.path[0]
    // console.log(e.nativeEvent, 'e.nativeEvent')
    const { targetMap = {} } = dndManager
    let targetDOMId = null
    // todo fix path
    // @ts-ignore
    e.nativeEvent.path.some(i => {
      const targetDOM = i.dataset?.dragid
      for (let item in targetMap) {
        if (targetMap[item] === targetDOM) {
          targetDOMId = item
          return true
        }
      }
    })
    if (targetId !== targetDOMId) return
    dndManager.changeResult({
      hoverId: targetDOMId,
      targetInfo: tarInfo,
    })
  }
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    // clear hoverId
    dndManager.changeResult({
      hoverId: null,
    })
  }

  // clone element
  return React.cloneElement(element, {
    onDrop: dropHandler,
    onDragOver: dragOverHandler,
    onDragLeave: dragLeaveHandler,
    ['data-dragid']: targetId,
  })
}

export default dropabbleConnect
