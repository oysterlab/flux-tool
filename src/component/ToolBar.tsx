import { CSSProperties } from 'react'
import { useDispatch } from 'react-redux'
import { newComponent } from '../reducer/componentReducer'

export default function ToolBar() {
	const dispatch = useDispatch()
	
	const style:CSSProperties = {
		width: '100%',
		height: '40px',
		borderBottom: '1px solid #ababab'
	}

	return (<div style={style}>
		<div onClick={() => dispatch(newComponent())}>ButtonBasicText</div>
	</div>)
}

