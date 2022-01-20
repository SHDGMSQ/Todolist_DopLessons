

export const ErrorAddItemFormReducer = (state: string | null, action: GeneralType) => {
    switch (action.type) {
        case 'ON-CHANGE-INPUT-ERROR': {
            return null
        }
        case "ADD-TASK-ERROR": {
            /* if (title === ''){
            //setError('Title is required')
            return
        } else{
            props.addItem(title.trim())
            //setTitle("")
        }*/
            return 'Title is required'
        }
        default: return state
    }
}

type GeneralType = onChangeInputErrorACType
| addTaskErrorACType

type onChangeInputErrorACType = ReturnType<typeof onChangeInputErrorAC>
export const  onChangeInputErrorAC= () => {
    return {
        type: 'ON-CHANGE-INPUT-ERROR',
        preload: {
        }
    } as const
}

type addTaskErrorACType = ReturnType<typeof addTaskErrorAC>
export const addTaskErrorAC = () => {
    return {
        type: 'ADD-TASK-ERROR',
        preload: {}
    } as const
}