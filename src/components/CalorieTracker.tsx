import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps){

    //contadores
    const caloriesConsumed = useMemo(() => activities.reduce((acc, activity) => activity.category === 1 ? acc + activity.calories : acc, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((acc, activity) => activity.category === 2 ? acc + activity.calories : acc, 0), [activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>

            <div className="flex flex-col items-center md:justify-between md:flex-row gap-5 mt-10">
                <CalorieDisplay 
                    calories={caloriesConsumed} 
                    text="Consumidas" 
                />
                <CalorieDisplay 
                    calories={caloriesBurned} 
                    text="Quemadas" 
                />
                <CalorieDisplay 
                    calories={netCalories} 
                    text="Diferencia" 
                />
            </div>
        </>
    )
}

