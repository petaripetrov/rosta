import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

enum APIEndpoints {
    surveys = 'surveys',
    login = 'login'
}

export default function useAPI(type: string) {

    const dispatch = useDispatch()
    const [result, setResult] = useState()

    useEffect(() => {
        dispatch({ type: 'SET_PENDING_TRUE' })

        switch (type) {

            case APIEndpoints.surveys:
                fetch('https://localhost:44375/getAllSurveys/1')
                    .then(res => res.json())
                    .then(res => {
                        if (res.error) {
                            throw (res.error);
                        }
                        dispatch({ type: 'SET_PENDING_FALSE' })
                        dispatch({
                            type: 'FETCH_SURVEYS_SUCCESS',
                            surveys: res
                        })
                        setResult(res)
                    })
                    .catch(error => {
                        dispatch({
                            type: 'SET_API_ERROR',
                            error: error
                        })
                        dispatch({ type: 'SET_PENDING_FALSE' })
                    })
                break

            case APIEndpoints.login:

                console.log('oop')

                break

            default:
                console.error('Invalid route')
                break
        }
    }, [type, dispatch])

    return result
}