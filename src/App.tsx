import { useState } from 'react'
import DndManager from './DndManager'
import DndComponent from './DndComponent'
import './App.css'

const mockData = new Array(10).fill('').map((i, idx) => {
  return {
    id: Math.random().toString(36).slice(2),
    name: 'souce-' + idx + 1,
  }
})

function App() {

  const [list, setList] = useState<any>({
    target_111: [],
    target_222: []
  })
  return (
    <div className="App">
      <DndManager
        onDragEnd={(v: any) => {
          const { targetId, sourceInfo } = v
          const { from } = sourceInfo
          const key = Math.random().toString(36).slice(2)
          if(!from) {
            const data = list[targetId] || []
            data.push({...sourceInfo, key})
            setList({
              ...list,
              [targetId]: [...data]
            })
          } else if(from !== targetId) {
            const fromData = list[from].filter(i => i.key !== sourceInfo.key)
            const targetData = [...(list[targetId] || []), sourceInfo]
            setList({
              [from]: fromData,
              [targetId]: targetData
            })
          }
        }}
        dropMode="move"
      >
        <div className="dnd-manage-container">
          {/* 左侧要拖拽的列表 */}
          <div className="dnd-manage-draglist">
            {mockData.map(i => (
              <DndComponent key={i.id} sourceId={i.id} sourceInfo={i}>
                <div style={{ cursor: 'pointer' }}>{i.name}</div>
              </DndComponent>
            ))}
          </div>

          {/* 右侧要拖放的区域 */}
          <DndComponent targetId="target_111">
            {({ isDragOver }: {isDragOver : boolean}) => (
              <div className={`dnd-manage-drop ${isDragOver ? 'active' : ''}`}>
                <span>target1 container</span>
                {list['target_111']?.map((i: any) => (
                  <DndComponent key={i.key} sourceId={i.key} sourceInfo={{ ...i, from: 'target_111' }}>
                    <div style={{ cursor: 'pointer' }}>{i.name}</div>
                  </DndComponent>
                ))}
              </div>
            )}
          </DndComponent>
          <DndComponent targetId="target_222" targetInfo={'target_222'}>
            {({ isDragOver }: {isDragOver : boolean}) => (
              <div className={`dnd-manage-drop ${isDragOver ? 'active' : ''}`}>Target2 container
                {(list['target_222'] || []).map((i: any) => (
                  <DndComponent key={i.key} sourceId={i.key} sourceInfo={{ ...i, from: 'target_222' }}>
                    <div style={{ cursor: 'pointer' }}>{i.name}</div>
                  </DndComponent>
                ))}
              </div>
            )}
          </DndComponent>
        </div>
      </DndManager>
    </div>
  )
}

export default App
