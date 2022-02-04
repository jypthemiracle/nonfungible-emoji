function customReducer (state = {}, action) {
    
    switch (action.type) {
        case 'SAY_HELLO':
            console.log("CCCCC", action)
            return {
                ...state,
                sayHello: "Hello, " + action.payload
            };
        default:
            return state
    }
}

export default customReducer;