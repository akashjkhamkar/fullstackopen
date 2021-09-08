const reducer = (state = [], action) => {
    switch (action.type) {
      case "QUERY":
        return action.data.result

      case "RESET":
        return []
  
      default:
        break;
    }
    return state
}

export const setResults = (result) => {
    return {
        type: "QUERY",
        data: {
            result
        }
    }
}

export default reducer