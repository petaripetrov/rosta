import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

enum APIEndpoints {
    surveys = 'surveys',
    login = 'login'
}

export default function useAPI(type: string) {

    const dispatch = useDispatch()
    const [result, setResult] = useState()
    const authCode = useSelector((state: any) => state.login.authCode)

    useEffect(() => {
        dispatch({ type: 'SET_PENDING_TRUE' })

        switch (type) {

            case APIEndpoints.surveys:
                fetch('https://localhost:44375/getAllSurveys/1', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authCode}`
                    }
                })
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

                break

            default:
                console.error('Invalid route')
                break
        }
    }, [type, dispatch])

    return result
}