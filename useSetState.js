const useSetState = (initialState) => {
    const [state, setState] = useState(initialState)
    const call = useRef(undefined);
    useEffect(() => {
        if (typeof call.current === "function") {
            call.current()
            call.current = undefined
        }
    })
    const setPartialState = (stateToSet, callback) => {
        call.current = callback
        if (typeof stateToSet === 'function') {
            stateToSet = stateToSet(state)
        }
        if (typeof state === 'object' &&
            typeof stateToSet === 'object' &&
            !Array.isArray(state) &&
            !Array.isArray(stateToSet)
        ) {
            setState({ ...state, ...stateToSet })
        } else {
            setState(stateToSet)
        }
    }
    return [state, setPartialState]
}