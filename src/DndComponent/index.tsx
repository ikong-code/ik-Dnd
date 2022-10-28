import React from 'react'
import { DndManagerContext } from '../DndManager/DndManagerContext'
import dropabbleConnect from './dropabbleConnect'
import draggableConnect from './draggableConnect'

export interface IDragDropProps {
  children: React.ReactElement | (({ isDragOver }: { isDragOver: boolean }) => React.ReactElement)
  sourceId?: string
  targetId?: string
  isdragged?: boolean
  targetInfo?: any
  sourceInfo?: any
}

const DndComponent = ({
  children,
  sourceId,
  targetId,
  sourceInfo,
  targetInfo,
}: IDragDropProps): React.ReactElement => {
  const dndContainerRef = React.useRef<HTMLElement>()

  const dndManager = React.useContext(DndManagerContext)

  const { addTarget, addSource, removeSource, removeTarget, result = { hoverId: '' } } = dndManager

  React.useEffect(() => {
    if (targetId) {
      addTarget(targetId, dndContainerRef, dndContainerRef.current?.dataset?.dragid)
    }

    if (sourceId) {
      addSource(sourceId, dndContainerRef)
    }
  }, [children, sourceId, targetId])

  React.useEffect(() => {
    return () => {
      if (sourceId) removeSource(sourceId)
      if (targetId) removeTarget(targetId)
    }
  }, [])

  return React.cloneElement(
    dropabbleConnect(
      draggableConnect(
        // 将 isDragOver 传递给 children
        typeof children === 'function'
          ? children({ isDragOver: result.hoverId === targetId })
          : children,
        sourceId,
        dndManager,
        !!sourceId, // drop组件不可拖拽
        sourceInfo
      ),
      targetId,
      dndManager,
      targetInfo
    ),
    { ref: dndContainerRef }
  )
}
export default DndComponent
