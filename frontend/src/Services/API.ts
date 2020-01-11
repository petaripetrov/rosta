import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function useAPI(url: string) {

    const dispatch = useDispatch()
    const [result, setResult] = useState()
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        dispatch({ type: 'SET_PENDING_TRUE' })
        setIsPending(true)
        fetch('https://localhost:44375/getAllSurveys/1')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch({ type: 'SET_PENDING_FALSE' })
                setIsPending(false)
                setResult(res)
            })
            .catch(error => {
                dispatch({
                    type: 'SET_API_ERROR',
                    error: error
                })
                dispatch({ type: 'SET_PENDING_FALSE' })
                setIsPending(false)
            })
    }, [url])

    return isPending
}