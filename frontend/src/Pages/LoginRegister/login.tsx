import React, { useState, useRef, FormEvent, FunctionComponent } from 'react'
import './loginRegister.css'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { FormInputField } from '../../types'

/**
 * Basic interface to handle LoginForm inputs
 * @param {string} email - Basic email value
 * @param {string} password - Basic password value
 */
interface LoginFormInputs {
    email: string,
    password: string
}

/**
 * 
 * Renders a login form.
 * @param {object} FormInputField
 * @param {string} classNames - a string representing the current classNames the element possesses
 * @param {boolean} validity - represents the validity of the given input
 */
export const LoginForm: FunctionComponent<{ initial?: FormInputField }> = ({ initial = { classNames: 'form-input', validity: undefined } }) => {
    const { t } = useTranslation()
    const password = useRef<any>(null)
    const history = useHistory()
    const email = useRef<any>(null)
    const dispatch = useDispatch()

    /**
     * Creates a value that forces re-renders every time one or more of the values in the object changes and a function to update that value
     * @param {object} FormInputField
     * @param {string} classNames - a string representing the current classNames the element possesses
     * @param {boolean} validity - represents the validity of the given input
     */
    let [emailState, setEmailState] = useState(initial)
    let [passwordState, setPasswordState] = useState(initial)


    /**
     * Sends a 'POST' type request to the API with inputs given to it by the form.
     * @param {object} LoginFormInputs
     * @param {string} email - string representing the currently inputed email
     * @param {string} password - string representing the currently inputed password
     */
    function loginUser(inputs: LoginFormInputs) {
        fetch('https://localhost:44375/login', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`Request rejected with status ${response.status}`)
            }
        }
        ).then(data => {
            let token = data.access_token
            history.push('/menu')
            dispatch({
                type: 'LOGIN_USER',
                payload: token
            })
        }).catch(error => console.log(error))
    }

    /**
     * Prevents default event resolution and replaces it with our implemantation
     * @param event 
     */
    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (emailState?.validity !== true || passwordState?.validity !== true || email.current !== null || password.current !== null) {
            // calls previously defined API function
            loginUser({
                email: email.current.value,
                password: password.current.value
            })
        }
    }

    /**
     * Handles Email change by changing the field's classnames based on the input. If the input is true the "is-error" className is removed and if its not its added.
     */
    function handleEmailChange() {
        if (email.current !== null && !email.current.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailState({
                classNames: 'form-input is-error',
                validity: true
            })

        } else {
            setEmailState({
                classNames: 'form-input',
                validity: false
            })
        }
    }

    /**
    * Handles Email change by changing the field's classnames based on the input. If the input is true the "is-error" className is removed and if its not its added.
    */
    function handlePasswordChange() {
        if (password.current !== null && !password.current.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)) {
            setPasswordState({
                classNames: 'form-input is-error',
                validity: true
            })

        } else {
            setPasswordState({
                classNames: 'form-input',
                validity: true
            })
        }
    }

    function handleRegisterButton() {
        history.push('/register')
    }

    /**
     * Form HTML definition
     */
    return (
        <form onSubmit={handleSubmit} className="loginForm">
            <div className="form-group">
                <div className="form-label">{t('Email')}</div>
                <input className={emailState.classNames} type="email" ref={email} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
                <div className="form-label">{t('Password')}</div>
                <input className={passwordState.classNames} type="password" ref={password} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
                <button type="submit" className="btn loginSubmitButton">
                    {t('Login')}
                </button>
            </div>
            <div className="form-group loginRegisterButton">
                <button className="btn formRegisterButton" onClick={handleRegisterButton}>
                    {t('Register')}
                </button>
            </div>
        </form>
    )
}
