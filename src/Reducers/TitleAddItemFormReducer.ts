import {ChangeEvent} from "react";

export const TitleAddItemFormReducer = (state: string, action: GeneralType) => {
    switch (action.type) {
        case 'ON-CHANGE-INPUT-TITLE': {
            return action.preload.e.currentTarget.value
        }
        case "ADD-TASK-TITLE": {
            return ''
        }
        default: return state
    }
}

type GeneralType = onChangeInputTitleAC
| addTaskTitleACType

type onChangeInputTitleAC = ReturnType<typeof onChangeInputTitleAC>
export const onChangeInputTitleAC = (e: ChangeEvent<HTMLInputElement>) => {
    return {
        type: 'ON-CHANGE-INPUT-TITLE',
        preload: {
            e
        }
    } as const
}

type addTaskTitleACType = ReturnType<typeof addTaskTitleAC>
export const addTaskTitleAC = () => {
    return {
        type: 'ADD-TASK-TITLE',
        preload: {}
    } as const
}
