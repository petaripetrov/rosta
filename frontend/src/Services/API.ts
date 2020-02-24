import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

enum APIEndpoints {
    surveys = 'surveys',
    users = 'users',
    schools = 'schools'
}

/**
 * Handles simple GET API requests.
 * @param {string} type - route 
 */
export default function useAPI(type: string, additionalInfo?: string) {

    const dispatch = useDispatch()
    const [result, setResult] = useState()
    const authCode = useSelector((state: any) => state.user.authCode)

    useEffect(() => {
        dispatch({ type: 'SET_PENDING_TRUE' })

        switch (type) {

            case APIEndpoints.surveys:
                fetch('https://localhost:44375/getAllSurveys', {
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

            case APIEndpoints.users:
                fetch(`https://localhost:44375/getAllUsers/${additionalInfo}`, {
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

            case APIEndpoints.schools:
                fetch(`https://localhost:44375/getAllSchools/`, {
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

            default:
                console.error('Invalid route')
                break
        }
    }, [type, dispatch])

    return result
}