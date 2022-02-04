const sayHelloAction = (params) => (
    {
        type: 'SAY_HELLO',
        payload: params
    }
)

export default sayHelloAction;