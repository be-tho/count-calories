import { ChangeEvent, useState, FormEvent, Dispatch } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories.ts";
import { ActivityActions } from "../reducers/activity-reducer.ts";

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initialState = {
    category: 0,
    name: '',
    calories: 0
}

export default function Form({dispatch}: FormProps){

    const [activity, setActivity] = useState<Activity>(initialState)

    //Se encarga de manejar los cambios en el formulario
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    //Valida los datos del formulario
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    //Se encarga de manejar el envio del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({
            type: 'save-activity',
            payload: {
                newActivity: activity
            }
        })

        setActivity(initialState)
    }

    return (
        <form 
        className="space-y-5 bg-white rounded-lg shadow p-10"
        onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Ej. Comida, juego de NMaranja, Ensalada, Ejericio, Pesas, Bicicleta "
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Calorias, ej. 100 o 1000"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>
            <input type="submit"
               className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg w-full cursor-pointer disabled:opacity-30"
               value={activity.category === 1 ? "Guardar Comida" : "Guardar Actividad"}
                   disabled={!isValidActivity()}
            />
        </form>
    )
}