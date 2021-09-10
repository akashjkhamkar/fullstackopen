const initialState = {msg:"slane castle sikhado koi", id:"69"}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "SHOW":
            if(state.id){
                clearTimeout(state.id)
            }
            return {
                msg: action.data.msg,
                id: action.data.id
            }
        case "RESET":
            return {msg: null, id: null}
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
        const id = setTimeout(() => {
            dispatch({type: "RESET"})
        }, time)
        dispatch(showNotification(msg, id))
    }
}

export const showNotification = (msg, id) => {
    return {
        type: "SHOW",
        data: {
            msg,
            id
        }
    }
}

export default reducer