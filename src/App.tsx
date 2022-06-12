import { useEffect } from 'react'
import DesignBoard from './component/DesignBoard'
import ToolBar from './component/ToolBar'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { useDispatch } from 'react-redux'

function App() {
  const dispath = useDispatch()
  
  const onKeyDown = (e:KeyboardEvent) => {

    if (e.metaKey && e.key == 'Backspace') {
      e.preventDefault()
      return
    }

    if (e.metaKey && e.key == 'c') {
    
      e.preventDefault()
      return
    }

    if (e.metaKey && e.key == 'x') {

      e.preventDefault()
      return
    }

    if (e.metaKey && e.key == 'z') {
      dispath(UndoActionCreators.undo())
      e.preventDefault()
      return      
    }
    
    if (e.metaKey && e.key == 'y') {
      dispath(UndoActionCreators.redo())
      e.preventDefault()
      return      
    }  
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown, true)

    return (() => {
      window.removeEventListener('keydown', onKeyDown, true)
    }) 
  })

  return (
    <div className="App">
      <ToolBar/>
      <DesignBoard/>
    </div>
  );
}

export default App;
