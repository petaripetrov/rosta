import React, { useState, useRef } from 'react'
import './loginRegister.css'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'


const BaseForm = (props) => {
    const { t } = useTranslation()

    return (
        <React.Fragment>
            <Form.Group controlId="formEmail">
                <Form.Label>{t('Email')}</Form.Label>
                <Form.Control type="input" ref={props.email} placeholder="Enter email" isInvalid={props.emailValidation} onBlur={props.onEmailChange} />
                <Form.Control.Feedback type='invalid'>{t('emailErrorMessage')}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>{t('Password')}</Form.Label>
                <Form.Control type="password" ref={props.password} placeholder="Enter email" isInvalid={props.passwordValidation} onBlur={props.onPasswordChange} />
                <Form.Control.Feedback type='invalid'>{t('passwordErrorMessage')}</Form.Control.Feedback>
            </Form.Group>
        </React.Fragment>
    )
}

export const LoginForm = (props) => {
    const { t } = useTranslation()
    const password = useRef()
    const history = useHistory()
    const email = useRef()
    const dispatch = useDispatch()

    let [emailValidation, setEmailValidation] = useState()
    let [passwordValidation, setPasswordValidation] = useState()

    return (
        <Form onSubmit={(event) => {
            event.preventDefault()
            if (emailValidation === undefined || passwordValidation === undefined || emailValidation === true || passwordValidation === true) {
                alert('error')
            } else if (email.current.value === 'admin@admin.com' && password.current.value === 'password') {
                dispatch({
                    type: 'TOASTER_DISPLAY',
                    payload: {
                        color: "lightgreen",
                        message: `${t('welcomeMessage')}`
                    }
                })
                dispatch({
                    type: 'LOGIN_USER'
                })
                history.push('/menu')
            } else {
                alert(`pass API request to login with ${email.current.value} & ${password.current.value}`)
            }
        }} className="loginForm">
            <BaseForm email={email} emailValidation={emailValidation}
                onEmailChange={() => {
                    if (!email.current.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                        setEmailValidation(true)

                    } else {
                        setEmailValidation(false)
                    }
                }} password={password} passwordValidation={passwordValidation}
                onPasswordChange={() => {
                    if (!password.current.value.match(/.{8,}$/)) {
                        setPasswordValidation(true)
                    } else {
                        setPasswordValidation(false)
                    }
                }} />
            <br />
            <Form.Group>
                <Button variant="primary" type="submit" className="loginSubmitButton">
                    {t('Login')}
                </Button>
            </Form.Group>
            <Form.Group className="loginRegisterButton">
                <Button variant="primary" className="formRegisterButton" onClick={() => {
                    history.push('/register')
                }}>
                    {t('Register')}
                </Button>
            </Form.Group>
        </Form>
    )
}

export const RegisterForm = (props) => {
    const email = useRef()
    const password = useRef()
    const confirmedPassword = useRef()
    const username = useRef()
    const { t } = useTranslation()


    let [confirmedPasswordValidation, setConfirmedPasswordValidation] = useState()
    let [emailValidation, setEmailValidation] = useState()
    let [passwordValidation, setPasswordValidation] = useState()
    let [usernameValidation, setUsernameValidation] = useState()


    return (
        <Form onSubmit={(event) => {
            if (passwordValidation) {
                event.preventDefault()
            } else {
                event.preventDefault()
                alert(`pass API request to register with ${email.current.value} & ${password.current.value} & ${username.current.value}`)
            }
        }} className="registerForm">
            <BaseForm email={email} emailValidation={emailValidation} onEmailChange={() => {
                if (!email.current.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    setEmailValidation(true)

                } else {
                    setEmailValidation(false)
                }
            }} password={password} passwordValidation={passwordValidation} onPasswordChange={() => {
                if (!password.current.value.match(/.{8,}$/)) {
                    setPasswordValidation(true)
                } else {
                    setPasswordValidation(false)
                }
            }} />
            <Form.Group controlId="formConfirmPassword">
                <Form.Label>{t('Confirm Password')}</Form.Label>
                <Form.Control type="password" ref={confirmedPassword} isInvalid={confirmedPasswordValidation} onBlur={() => {
                    if (password.current.value !== confirmedPassword.current.value) {
                        setConfirmedPasswordValidation(true)
                    } else {
                        setConfirmedPasswordValidation(false)
                    }
                }} placeholder="Confirm Password" />
                <Form.Control.Feedback type="invalid">{t('passwordMatchError')}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
                <Form.Label>{t('Username')}</Form.Label>
                <Form.Control type="text" ref={username} placeholder="Username" isInvalid={usernameValidation} onBlur={() => {
                    if (!username.current.value.match(/.{3,}$/)) {
                        setUsernameValidation(true)
                    } else {
                        setUsernameValidation(false)
                    }
                }} />
                <Form.Control.Feedback type="invalid">{t('usernameError')}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="registerSubmitGroup">
                <Button variant="primary" type="submit" className="registerSubmitButton">
                    {t('Register')}
                </Button>
            </Form.Group>
        </Form>
    )
}

