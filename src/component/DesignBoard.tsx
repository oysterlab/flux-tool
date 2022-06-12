import { CSSProperties } from 'react'
import { useSelector } from 'react-redux'
import ButtonBasicText from '../flux/component/ButtonBasicText'
import { RootState } from '../store'
import { Property as ButtonBasicTextProperty } from '../flux/component/ButtonBasicText'
import { selectedComponents as selectedComponentsSelector } from '../reducer/componentReducer'

export default function DesignBoard() {

	const selectedComponents = useSelector(selectedComponentsSelector)
	const style:CSSProperties = {
		width: '100%',
		height: '100vh'
	}

	const components = useSelector((state:RootState) => state.component.present.components)

	return (<div style={style}>
		{selectedComponents.map(({id}) => <div key={id}>{id}</div>)}
		{components.map((component) => {
			const property = (component as ButtonBasicTextProperty)
			return <ButtonBasicText {...property} key={property.id}/>
		})}
	</div>)
}

