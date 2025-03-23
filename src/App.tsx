import { useReducer, useEffect, useMemo } from 'react'
import Form from './components/Form'
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList'

function App() {

	const [state, dispatch] = useReducer(activityReducer, initialState)

	//Se encarga de guardar las actividades en el localStorage
	useEffect(() => {
		localStorage.setItem('activities', JSON.stringify(state.activities))
	}, [state.activities])

	const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])

	return (
		<>
			<header className="bg-lime-600 py-3">
				<div className="max-w-4xl mx-auto flex justify-between">
					<h1 className="text-center text-lg font-bold text-white uppercase">
						Contador de Calorias
					</h1>
					<button 
						className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
						onClick={() => dispatch({type: 'restart-activities'})}
						disabled={!canRestartApp}
					>
						Reiniciar App
					</button>
				</div>
			</header>
			<section className="bg-lime-500 py-20 px-5">
				<div className="max-w-4xl mx-auto">
					<Form 
						dispatch={dispatch}
						state={state}
					/>
				</div>
			</section>
			<section className="p-10 mx-auto max-w-4xl bg-gray-100">
				<ActivityList 
					activities={state.activities}
					dispatch={dispatch}
				/>
			</section>
		</>
	)
}

export default App
