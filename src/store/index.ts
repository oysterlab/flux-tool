import { configureStore } from '@reduxjs/toolkit'
import componentReducer from '../reducer/componentReducer'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'
import undoable from 'redux-undo'

export const store = configureStore({
	reducer: {
		component: undoable(componentReducer, {
			filter: ({type}:AnyAction) => {
				const isHistory = !((type + '').startsWith('selection'))
				console.log(type, isHistory)
				return isHistory
			}
		})
	}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()