export enum EDragResultStatus {
  DRAG = 'DRAG',
  DROP = 'DROP',
  CANCEL = 'CANCEL',
}

export type sourceId = string | null | undefined

export type targetId = string | null | undefined

export type dropMode = DataTransfer['dropEffect']

export type source = any

export type target = any

export type sourceMap = Record<string, source>

export type targetMap = Record<string, target>

export interface IResult {
  sourceId: sourceId
  targetId: targetId
  status: EDragResultStatus | null
  hoverId: targetId
  targetInfo: any
  sourceInfo: any
}

export interface IDndManager {
  dropMode: dropMode
  sourceMap: sourceMap
  targetMap: targetMap
  result?: IResult
  changeResult: (result: Partial<IResult>) => void
  addSource: (sourceId: sourceId, source: source) => void
  removeSource: (sourceId: sourceId) => void
  addTarget: (targetId: targetId, target: target, dataId: targetId) => void
  removeTarget: (targetId: targetId) => void
}
