import { useMemo } from "react"
import { Activity } from "../types"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps){

    //contadores
    const caloriesConsumed = useMemo(() => activities.reduce((acc, activity) => activity.category === 1 ? acc + activity.calories : acc, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((acc, activity) => activity.category === 2 ? acc + activity.calories : acc, 0), [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>

            <div className="flex flex-col items-center md:justify-between md:flex-row gap-5 mt-10">
                <p className="text-white text-center font-bold rounded-full grid grid-cols-1 gap-3">
                    <span className="font-black text-6xl text-orange-500">{caloriesConsumed}</span>
                    Consumidas
                </p>
                <p className="text-white text-center font-bold rounded-full grid grid-cols-1 gap-3">
                    <span className="font-black text-6xl text-orange-500">{caloriesBurned}</span>
                    Quemadas
                </p>
            </div>
        </>
    )
}

