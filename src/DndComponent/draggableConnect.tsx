import React from 'react'
import { EDragResultStatus, IDndManager, sourceId } from '../DndManager/type'

function draggableConnect(
  element: React.ReactElement,
  sourceId: sourceId,
  dndManager: IDndManager,
  isdragged: boolean,
  sourceInfo?: any
): React.ReactElement {
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, sourceId: sourceId) => {
    if (dndManager.dropMode) e.dataTransfer.dropEffect = dndManager.dropMode
    // 拖拽starting 赋值sourceid
    if (!sourceId) return
    dndManager?.changeResult({
      status: EDragResultStatus.DRAG,
      sourceId: sourceId,
      sourceInfo,
      hoverId: null,
      targetId: null,
    })
  }

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    // todo 有可能是从drop组件中拖拽组件 拖拽过程中sourceId丢失问题 强行赋值
    if (!sourceId) return
    if (dndManager?.result?.sourceId && dndManager?.result.targetId) {
      dndManager?.changeResult({
        status: EDragResultStatus.DROP,
        sourceInfo,
        hoverId: null,
      })
    } else {
      dndManager?.changeResult({
        status: EDragResultStatus.CANCEL,
        sourceInfo,
        hoverId: null,
        sourceId: null,
        targetId: null,
      })
    }
  }

  return React.cloneElement(element, {
    draggable: isdragged,
    onDragStart: (e: any) => {
      dragStartHandler(e, sourceId)
    },
    onDragEnd: dragEndHandler,
  })
}

export default draggableConnect
