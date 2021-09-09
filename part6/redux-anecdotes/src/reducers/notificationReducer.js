const initialState = "slane castle sikhado koi"

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "SHOW":
            return action.data.msg
        case "RESET":
            return ""
        default:
            break
    }
    return state
}

// export const notify = (dispatch, msg) => {
//     dispatch(showNotification(msg))
//     setTimeout(() => {
//         dispatch({type: "RESET"})
//     }, 5000)
// }

export const notify = (msg, time) => {
    return async dispatch => {
        dispatch(showNotification(msg))
        setTimeout(() => {
            dispatch({type: "RESET"})
        }, time)
    }
}

export const showNotification = (msg) => {
    return {
        type: "SHOW",
        data: {
            msg
        }
    }
}

export default reducer