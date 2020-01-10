import React, { useState, useRef, RefObject } from 'react'
import './loginRegister.css'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'


const BaseForm = (props: any) => {
    const { t } = useTranslation()

    return (
        <React.Fragment>
            <Row>
                <Form.Group controlId="formEmail">
                    <Form.Label>{t('Email')}</Form.Label>
                    <Form.Control type="input" ref={props.email} placeholder="Enter email" isInvalid={props.emailValidation} onBlur={props.onEmailChange} />
                    <Form.Control.Feedback type='invalid'>{t('emailErrorMessage')}</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="formPassword">
                    <Form.Label>{t('Password')}</Form.Label>
                    <Form.Control type="password" ref={props.password} placeholder="Enter email" isInvalid={props.passwordValidation} onBlur={props.onPasswordChange} />
                    <Form.Control.Feedback type='invalid'>{t('passwordErrorMessage')}</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </React.Fragment>
    )
}

export const LoginForm = (props: any) => {
    const { t } = useTranslation()
    const password = useRef()
    const history = useHistory()
    const email = useRef<HTMLElement>(null)
    const dispatch = useDispatch()

    let [emailValidation, setEmailValidation] = useState()
    let [passwordValidation, setPasswordValidation] = useState()

    function handleSubmit(event: Event) {
        event.preventDefault()
        if (emailValidation === undefined || passwordValidation === undefined || emailValidation === true || passwordValidation === true) {
            alert('error')
        } else if (email !== null && email.current.value !== null && email.current.value === 'admin@admin.com' && password.current.value === 'password') {
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
    }

    function handleEmailChange() {
        if (!email.current.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailValidation(true)

        } else {
            setEmailValidation(false)
        }
    }

    function handlePasswordChange() {
        if (!password.current.value.match(/.{8,}$/)) {
            setPasswordValidation(true)
        } else {
            setPasswordValidation(false)
        }
    }

    function handleRegisterButton() {
        history.push('/register')
    }

    return (
        <Form onSubmit={handleSubmit} className="loginForm">
            <BaseForm email={email} emailValidation={emailValidation}
                onEmailChange={handleEmailChange} password={password} passwordValidation={passwordValidation}
                onPasswordChange={handlePasswordChange} />
            <br />
            <Row>
                <Form.Group>
                    <Button variant="primary" type="submit" className="loginSubmitButton">
                        {t('Login')}
                    </Button>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="loginRegisterButton">
                    <Button variant="primary" className="formRegisterButton" onClick={handleRegisterButton}>
                        {t('Register')}
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    )
}

export const RegisterForm = (props: any) => {
    const email = useRef()
    const password = useRef()
    const confirmedPassword = useRef()
    const username = useRef()
    const { t } = useTranslation()


    let [confirmedPasswordValidation, setConfirmedPasswordValidation] = useState()
    let [emailValidation, setEmailValidation] = useState()
    let [passwordValidation, setPasswordValidation] = useState()
    let [usernameValidation, setUsernameValidation] = useState()

    function handleSubmit(event) {
        if (passwordValidation === false && emailValidation === false && usernameValidation === false && confirmedPasswordValidation === false) {
            event.preventDefault()
            alert(`pass API request to register with ${email.current.value} & ${password.current.value} & ${username.current.value}`)
        } else {
            event.preventDefault()
            alert('error')
        }
    }

    function handleEmailChange() {
        if (!email.current.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailValidation(true)

        } else {
            setEmailValidation(false)
        }
    }

    function handlePasswordChange() {
        if (!password.current.value.match(/.{8,}$/)) {
            setPasswordValidation(true)
        } else {
            setPasswordValidation(false)
        }
    }

    function handleConfirmPasswordChange() {
        if (password.current.value !== confirmedPassword.current.value) {
            setConfirmedPasswordValidation(true)
        } else {
            setConfirmedPasswordValidation(false)
        }
    }

    function handleUsernameChange() {
        if (!username.current.value.match(/.{3,}$/)) {
            setUsernameValidation(true)
        } else {
            setUsernameValidation(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="registerForm" >
            <BaseForm email={email} emailValidation={emailValidation} onEmailChange={handleEmailChange} password={password} passwordValidation={passwordValidation} onPasswordChange={handlePasswordChange} />
            <Row>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>{t('Confirm Password')}</Form.Label>
                    <Form.Control type="password" ref={confirmedPassword} isInvalid={confirmedPasswordValidation} onBlur={handleConfirmPasswordChange} placeholder="Confirm Password" />
                    <Form.Control.Feedback type="invalid">{t('passwordMatchError')}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>{t('Username')}</Form.Label>
                    <Form.Control type="text" ref={username} placeholder="Username" isInvalid={usernameValidation} onBlur={handleUsernameChange} />
                    <Form.Control.Feedback type="invalid">{t('usernameError')}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="registerSubmitGroup">
                    <Button variant="primary" type="submit" className="registerSubmitButton">
                        {t('Register')}
                    </Button>
                </Form.Group>
            </Row>
        </Form >
    )
}