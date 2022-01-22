export const EditReducer = (state: boolean, action: GeneralType) => {
    switch (action.type) {
        case 'ON-DOUBLE-CLICK-EDIT': {
            return false
        }
        case 'ON-BLUR-HANDLER': {
            return true
        }
        case 'ON-KEY-PRESS-EDIT': {
            return true
        }
        default: return state
    }
}
type GeneralType = onDoubleClickEditACType
| onBlurHandlerACType
| onKeyPressEditACType

type onDoubleClickEditACType = ReturnType<typeof onDoubleClickEditAC>
export const onDoubleClickEditAC = () => {
    return {
        type: 'ON-DOUBLE-CLICK-EDIT',
        preload: {}
    } as const
}

type onBlurHandlerACType = ReturnType<typeof onBlurHandlerAC>
export const onBlurHandlerAC = () => {
    return {
        type: 'ON-BLUR-HANDLER',
        preload: {}
    } as const
}

type onKeyPressEditACType = ReturnType<typeof onKeyPressEditAC>
export const onKeyPressEditAC = () => {
    return {
        type: 'ON-KEY-PRESS-EDIT',
        preload: {}
    } as const
}

