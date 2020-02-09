import React, { useState, useRef, FormEvent, FunctionComponent } from 'react'
import './loginRegister.css'
import { Form, Button, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

interface registerFormInputs {
    email: string,
    password: string,
    username: string
}

export const RegisterForm: FunctionComponent = () => {
    const email = useRef<any>(null)
    const password = useRef<any>(null)
    const confirmedPassword = useRef<any>(null)
    const username = useRef<any>(null)
    const history = useHistory()
    const { t } = useTranslation()

    const [confirmedPasswordValidation, setConfirmedPasswordValidation] = useState()
    const [emailValidation, setEmailValidation] = useState()
    const [passwordValidation, setPasswordValidation] = useState()
    const [usernameValidation, setUsernameValidation] = useState()

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

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (emailValidation === undefined || passwordValidation === undefined || emailValidation === true || passwordValidation === true || confirmedPassword === undefined || username === undefined || email.current === null || password.current === null || username.current === null) {
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
            setEmailValidation(true)

        } else {
            setEmailValidation(false)
        }
    }

    function handlePasswordChange() {
        if (password.current !== null && !password.current.value.match(/.{8,}$/)) {
            setPasswordValidation(true)
        } else {
            setPasswordValidation(false)
        }
    }

    function handleConfirmPasswordChange() {
        if (password.current !== null && confirmedPassword.current !== null && password.current.value !== confirmedPassword.current.value) {
            setConfirmedPasswordValidation(true)
        } else {
            setConfirmedPasswordValidation(false)
        }
    }

    function handleUsernameChange() {
        if (username.current !== null && !username.current.value.match(/.{3,}$/)) {
            setUsernameValidation(true)
        } else {
            setUsernameValidation(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="registerForm" >
            <div className="form-group">
                <div className="form-label">{t('Email')}</div>
                <input className="form-input" type="text" ref={email} placeholder={t('Email')} onBlur={handleEmailChange}/>
                <div>{t('emailErrorMessage')}</div>
            </div>
            <div className="form-group">
                <div className="form-label">{t('Password')}</div>
                <input className="form-input" type="password" ref={password} onBlur={handlePasswordChange}/>
                <p>{t('passwordErrorMessage')}</p>
            </div>
            <div className="form-group">
                <div className="form-label">{t('Confirm Password')}</div>
                <input className="form-input" type="password" ref={confirmedPassword} onBlur={handleConfirmPasswordChange} />
                <div>{t('passwordMatchError')}</div>
            </div>
            <div className="form-group">
                <div className="form-label">{t('Username')}</div>
                <input className="form-input" type="text" ref={username} onBlur={handleUsernameChange} />
                <div>{t('usernameError')}</div>
            </div>
            <div className="registerSubmitGroup">
                <button type="submit" className="btn registerSubmitButton">
                    {t('Register')}
                </button>
            </div>
        </form >
    )
}