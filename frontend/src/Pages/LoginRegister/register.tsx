import React, { useState, useRef, FormEvent, FunctionComponent } from 'react'
import './loginRegister.css'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { FormInputField } from '../../types'

interface registerFormInputs {
    email: string,
    password: string,
    username: string
}

/**
 * Renders RegisterForm
 * @param {Object} initial - FormInputField type object to handle validation
 */
export const RegisterForm: FunctionComponent<{ initial?: FormInputField }> = ({ initial = { classNames: 'form-input', validity: undefined } }) => {
    const email = useRef<any>(null)
    const password = useRef<any>(null)
    const confirmedPassword = useRef<any>(null)
    const username = useRef<any>(null)
    const history = useHistory()
    const { t } = useTranslation()


    /**
     * Creates a value that forces re-renders every time one or more of the values in the object changes and a function to update that value
     * @param {object} FormInputField
     * @param {string} classNames - a string representing the current classNames the element possesses
     * @param {boolean} validity - represents the validity of the given input
     */
    const [confirmedPasswordState, setConfirmedPasswordState] = useState(initial)
    const [emailState, setEmailState] = useState(initial)
    const [passwordState, setPasswordState] = useState(initial)
    const [usernameState, setUsernameState] = useState(initial)

    /**
     * Sends a 'POST' type request to the API with inputs given to it by the form.
     * @param {object} RegisterFormInputs
     * @param {string} email - string representing the currently inputed email
     * @param {string} password - string representing the currently inputed password
     * @param {string} username - string representing the currently inputed username
     */
    function registerUser(inputs: registerFormInputs) {
        fetch('https://localhost:44375/createUser', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                history.push('/login')
            } else {
                throw Error(`Request rejected with status ${response.status}`)
            }
        }).catch(error => console.log(error))
    }

    /**
     * Prevents default event resolution and replaces it with our implemantation
     * @param event 
     */
    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (emailState?.validity === true || passwordState?.validity === true || confirmedPasswordState?.validity === true || usernameState?.validity === true || email.current === null || password.current === null || username.current === null) {
            alert('error')
        } else {
            registerUser({
                email: email.current.value,
                password: password.current.value,
                username: username.current.value
            })
        }
    }

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

    function handlePasswordChange() {
        if (password.current !== null && !password.current.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)) {
            setPasswordState({
                classNames: 'form-input is-error',
                validity: true
            })
        } else {
            setPasswordState({
                classNames: 'form-input',
                validity: false
            })
        }
    }

    function handleConfirmPasswordChange() {
        if (password.current !== null && confirmedPassword.current !== null && password.current.value !== confirmedPassword.current.value) {
            setConfirmedPasswordState({
                classNames: 'form-input is-error',
                validity: true
            })
        } else {
            setConfirmedPasswordState({
                classNames: 'form-input',
                validity: false
            })
        }
    }

    function handleUsernameChange() {
        if (username.current !== null && !username.current.value.match(/.{3,}$/)) {
            setUsernameState({
                classNames: 'form-input is-error',
                validity: true
            })
        } else {
            setUsernameState({
                classNames: 'form-input',
                validity: false
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="registerForm" >
            <div className="form-group">
                <div className="form-label">{t('Email')}</div>
                <input className={emailState.classNames} type="text" ref={email} placeholder={t('Email')} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
                <div className="form-label">{t('Password')}</div>
                <input className={passwordState.classNames} type="password" ref={password} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
                <div className="form-label">{t('Confirm Password')}</div>
                <input className={confirmedPasswordState.classNames} type="password" ref={confirmedPassword} onChange={handleConfirmPasswordChange} />
            </div>
            <div className="form-group">
                <div className="form-label">{t('Username')}</div>
                <input className={usernameState.classNames} type="text" ref={username} onChange={handleUsernameChange} />
            </div>
            <div className="registerSubmitGroup">
                <button type="submit" className="btn registerSubmitButton">
                    {t('Register')}
                </button>
            </div>
        </form >
    )
}