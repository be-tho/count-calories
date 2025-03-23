import { Activity } from "../types"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps){
    return (
        <div>
            <h2>Calorie Tracker</h2>
        </div>
    )
}

