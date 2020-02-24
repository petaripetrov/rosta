import { Action, Dispatch } from "redux"

const rostaMiddleware = (store: any) => (next: any) => (action: any) => {

    let authCodeExpression = /\(([^\)]+)\)/
    let authCodeGroup = authCodeExpression.exec(document.cookie)
    let authCode = authCodeGroup !== null ? authCodeGroup[1] : undefined

    if (action.type === 'LOAD_FROM_COOKIES' && authCode !== undefined) {
        fetch('https://localhost:44375/roleCheck', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCode}`
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                store.dispatch({ type: 'LOGOUT_USER' })
                store.dispatch({ type: 'SET_PENDING_FALSE' })
            }
        })
            .then(response => {
                console.log(response.status)
                if (response.error) {
                    throw (response.error)
                }
                store.dispatch({
                    type: 'SET_USER_ROLE',
                    payload: response.role
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
    next(action)
}

export default rostaMiddleware