import { Activity } from "../types"


export type ActivityActions = 
    { type : 'save-activity', payload: {newActivity : Activity} } |
    { type : 'set-active-id', payload: {activeId : Activity['id']} }

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
        //esto maneja la logica para actualizar el estado

        return {
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    if(action.type === 'set-active-id'){
        return {
            ...state,
            activeId: action.payload.activeId
        }
    }

    return state
}