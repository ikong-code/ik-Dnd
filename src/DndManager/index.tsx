import React from 'react'
import { DndManagerContext } from './DndManagerContext'
import {
  dropMode,
  EDragResultStatus,
  IResult,
  source,
  sourceId,
  sourceMap,
  target,
  targetId,
  targetMap,
} from './type'

interface Props {
  children?: React.ReactNode
  onDragEnd: (result: IResult) => void
  dropMode: dropMode
}

interface State {
  dropMode: dropMode
  sourceMap: sourceMap
  targetMap: targetMap
  result: IResult
}

export default class DndManager extends React.Component<Props, State> {
  // Context state
  state: State = {
    dropMode: this.props.dropMode || 'move',
    sourceMap: {},
    targetMap: {},
    result: {
      targetId: null,
      sourceId: null,
      status: null,
      hoverId: null,
      targetInfo: null, // drop区域附带信息
      sourceInfo: null, // 拖拽组件附带信息
    },
  }

  // change the result of dnd
  changeResult(result: Partial<IResult>) {
    const { onDragEnd } = this.props
    const newResult = { ...this.state.result, ...result }
    if (result.status && result.status === EDragResultStatus.DROP) {
      onDragEnd(newResult)
    }
    this.setState({ ...this.state, result: newResult })
  }

  // 注册 drag 组件
  public addSource(sourceId: sourceId, source: source) {
    if (sourceId && !this.state.sourceMap[sourceId]) {
      this.state.sourceMap[sourceId] = source.current
    }
  }

  // 注册 drop
  public addTarget(targetId: targetId, target: target, dataId: targetId) {
    if (targetId && !this.state.targetMap[targetId]) {
      this.state.targetMap[targetId] = dataId
    }
  }

  // remove a source
  public removeSource(sourceId: sourceId) {
    console.log(sourceId, 'removeSource')
  }

  // remove a target
  public removeTarget(targetId: targetId) {
    console.log(targetId, 'removeTarget')
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dropMode } = this.state
    if (dropMode !== nextProps.dropMode) {
      this.setState({
        dropMode: nextProps.dropMode,
      })
    }
  }

  render() {
    const { children } = this.props
    return (
      // 注入 Drag Drop Context
      <DndManagerContext.Provider
        value={{
          ...this.state,
          addSource: this.addSource.bind(this),
          addTarget: this.addTarget.bind(this),
          removeSource: this.removeSource.bind(this),
          removeTarget: this.removeTarget.bind(this),
          changeResult: this.changeResult.bind(this),
        }}
      >
        {children}
      </DndManagerContext.Provider>
    )
  }
}
