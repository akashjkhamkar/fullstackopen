const initialState = {msg:null, id:null}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "SHOW":
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
    return async (dispatch, getState) => {
        const id = getState(state => state).notification.id
        console.log("id", id)        
        if(id){
            clearTimeout(id)
        }

        const newid = setTimeout(() => {
            dispatch({type: "RESET"})
        }, time)
        dispatch(showNotification(msg, newid))
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