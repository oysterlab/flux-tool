import { CSSProperties, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { selection, updateComponent } from '../../reducer/componentReducer'
import { Property as BasicProperty } from './Component'

export interface Property extends BasicProperty {
	text: string
}

export function newComponent():Property {
	return {
		id: `ButtonBasicText_${Math.random() * 1000 | 0}`,
		text: 'Text28',
		x: 100,
		y: 100,
		width: 39 * 8,
		height: 9 * 8
	}
}

export default function ButtonBasicText(props:Property) {
	const dispatch = useDispatch()
	const componentRef = useRef<HTMLDivElement>(null)
	let isMouseDown: boolean = false
	let offset: Array<number> = [0, 0]

	const onMouseMove = (e:MouseEvent) => {
		e.preventDefault()

		const component = componentRef.current
		if (!component || !isMouseDown) return
		let x = e.clientX + offset[0]
		let y = e.clientY + offset[1]

		component.style.left = x + 'px'
		component.style.top = y + 'px'
	}

	const onMouseUp = () => {
		const component = componentRef.current
		if (!component || !isMouseDown) return

		isMouseDown = false
		document.removeEventListener('mousemove', onMouseMove, true)

		const nextProps = {...props}

		nextProps.x = parseInt(component.style.left)
		nextProps.y = parseInt(component.style.top)	
		
		if ((nextProps.x == props.x) && (nextProps.y == props.y)) return

		dispatch(updateComponent(nextProps))
	}

	const onMouseDown = (e:MouseEvent) => {
		isMouseDown = true
		const component = componentRef.current
		if (!component) return
		offset = [component.offsetLeft - e.clientX, component.offsetTop - e.clientY]

		document.addEventListener('mousemove', onMouseMove)
		document.addEventListener('mouseup', onMouseUp)

		dispatch(selection(props.id))		
	}

	useEffect(() => {
		const component = componentRef.current
		component?.addEventListener('mousedown', onMouseDown, true)

		return () => {
			component?.removeEventListener('mousedown', onMouseDown, true)
			document?.removeEventListener('mouseup', onMouseUp, true)
			document?.removeEventListener('mousemove', onMouseMove, true)			
		}
	})

	const style:CSSProperties = {
		color: '#FFFFFF',
		background: '#ADADAD',
		borderRadius: 2 * 8,
		textAlign: 'center',
		fontSize: 28,
		position: 'absolute',
		userSelect: 'none',		

		left: props.x,
		top: props.y,
		width: props.width,
		height: props.height,
		lineHeight: props.height+'px',
	}
	
	return (
		<div style={style} ref={componentRef}>
			{props.text}		
		</div>
	)
}

