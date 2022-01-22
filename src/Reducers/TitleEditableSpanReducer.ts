export const TitleEditableSpanReducer = (state: string, action: GeneralType) => {
    switch (action.type) {
        case 'ON-DOUBLE-CLICK-TITLE': {
            return action.preload.newTitle
        }
        case 'ON-CHANGE-TITLE': {
            return action.preload.value
        }
        default: return state
    }
}
type GeneralType = onDoubleClickTitleACType
| onChangeTitleACType

type onDoubleClickTitleACType = ReturnType<typeof onDoubleClickTitleAC>
export const onDoubleClickTitleAC = (newTitle: string) => {
    return {
        type: 'ON-DOUBLE-CLICK-TITLE',
        preload: {
            newTitle
        }
    } as const
}

type onChangeTitleACType = ReturnType<typeof onChangeTitleAC>
export const onChangeTitleAC = (value: string) => {
    return {
        type: 'ON-CHANGE-TITLE',
        preload: {
            value
        }
    } as const
}