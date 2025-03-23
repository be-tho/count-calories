import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

export type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}
export default function ActivityList({activities, dispatch} : ActivityListProps){

    const categoryName = useMemo(() => (category : Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities] )
    return (
       <>
        <h2 className="text-4xl font-bold text-center text-slate-600">Comida y Actividades</h2>
        {activities.map(activity => (
            <div key={activity.id} className="px-5 py-10 bg-lime-100 mt-5 flex justify-between rounded-lg">
                <div className="space-y-2 relative">
                    <p className={`absolute -top-5 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                        {categoryName(activity.category)}
                    </p>
                    <p className="text-2xl font-bold pt-5">
                        {activity.name}
                    </p>
                    <p className="font-black text-4xl text-lime-500">
                        {activity.calories} {''}
                        <span>Calorias</span>
                    </p>
                </div>
                <div className="flex items-center gap-5">
                    <button 
                        onClick={() => dispatch({type: 'set-active-id', payload: {activeId: activity.id}})}
                    >
                        <PencilSquareIcon className="w-6 h-6 text-slate-800 cursor-pointer" />
                    </button>
                    <button
                        onClick={() => dispatch({type: 'delete-activity', payload: {activeId: activity.id}})}
                    >
                        <TrashIcon className="w-6 h-6 text-slate-800 cursor-pointer" />
                    </button>

                </div>
            </div>
        ))}
       </>
    )
}
