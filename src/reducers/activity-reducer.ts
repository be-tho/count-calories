import { Activity } from "../types"


export type ActivityActions = 
    { type : 'save-activity', payload: {newActivity : Activity} } |
    { type : 'set-active-id', payload: {activeId : Activity['id']} } |
    {type : 'delete-activity', payload: {activeId : Activity['id']}} |
    {type : 'restart-activities'}

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    //Se encarga de guardar una actividad
    if(action.type === 'save-activity'){
        let updatedActivities : Activity[] = []
        if(state.activeId){
           updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    //Se encarga de setear el id de la actividad activa
    if(action.type === 'set-active-id'){
        return {
            ...state,
            activeId: action.payload.activeId
        }
    }

    //Se encarga de eliminar una actividad
    if(action.type === 'delete-activity'){
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.activeId)
        }
    }

    //Se encarga de reiniciar las actividades
    if(action.type === 'restart-activities'){
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}