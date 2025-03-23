import { Activity } from "../types"


export type ActivityActions = 
    { type : 'save-activity', payload: {newActivity : Activity} } |
    { type : 'set-active-id', payload: {activeId : Activity['id']} } |
    {type : 'delete-activity', payload: {activeId : Activity['id']}}

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

export const initialState : ActivityState = {
    activities: [],
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {


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

    if(action.type === 'set-active-id'){
        return {
            ...state,
            activeId: action.payload.activeId
        }
    }

    if(action.type === 'delete-activity'){
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.activeId)
        }
    }

    return state
}