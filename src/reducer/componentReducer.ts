import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as ButtonBasicText from '../flux/component/ButtonBasicText'
import { Property } from '../flux/component/Component'
import { RootState } from '../store'
import { ComponentState, initialState } from './State'

const selection = createAction<string>('selection/selection')
//const releaseSelections = createAction<string>('releaseSelections')

export const componentSlice = createSlice({
	name: 'component',
	initialState,
	reducers: {
		newComponent(state:ComponentState) {
			const newComponent = ButtonBasicText.newComponent()
			state.components.push(newComponent)
			state.selections = [newComponent.id]
		},
		updateComponent(state:ComponentState, {payload:component}:PayloadAction<Property>) {
			const targetIdx = state.components.findIndex((({id}) => id == component.id))
			if (targetIdx == -1) return
			state.components[targetIdx] = component
		}
	},
	extraReducers: (builder) => {
		builder.addCase(selection, (state, {payload:id}:PayloadAction<string>) => {
			state.selections = [id]
		})
	}
})

export const selectedComponents = createSelector(
	(state: RootState) => state.component.present.components, 
	(state: RootState) => state.component.present.selections, 
		(components, selections) => {
			return components.filter((c) => selections.find((id) => id == c.id))
		}
	)


export const { newComponent, updateComponent } = componentSlice.actions
export { selection }

export default componentSlice.reducer