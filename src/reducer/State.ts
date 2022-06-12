import { Property } from '../flux/component/Component'

export type ComponentState = {
	components: Property[],
	selections: string[]
}

export const initialState: ComponentState = {
	components: [],
	selections: []
}