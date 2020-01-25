import { useState, useRef, FormEvent } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const RegisterForm = () => {
    const email = useRef()
    const password = useRef()
    const confirmedPassword = useRef()
    const username = useRef()
    const { t } = useTranslation()

    const [confirmedPasswordValidation, setConfirmedPasswordValidation] = useState()
    const [emailValidation, setEmailValidation] = useState()
    const [passwordValidation, setPasswordValidation] = useState()
    const [usernameValidation, setUsernameValidation] = useState()

    function handleSubmit(event) {
        event.preventDefault()
        if (emailValidation === undefined || passwordValidation === undefined || emailValidation === true || passwordValidation === true || confirmedPassword === undefined || username === undefined || email.current === null || password.current === null || username.current === null) {
            alert('error')
        } else {
            alert(`pass API request to register`)
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
        <Form onSubmit={handleSubmit} className="registerForm" >
            <Row>
                <Form.Group controlId="formEmail">
                    <Form.Label>{t('Email')}</Form.Label>
                    <Form.Control type="input" ref={email} isInvalid={emailValidation} onBlur={handleEmailChange} />
                    <Form.Control.Feedback type='invalid'>{t('emailErrorMessage')}</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="formPassword">
                    <Form.Label>{t('Password')}</Form.Label>
                    <Form.Control type="password" ref={password} isInvalid={passwordValidation} onBlur={handlePasswordChange} />
                    <Form.Control.Feedback type='invalid'>{t('passwordErrorMessage')}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>{t('Confirm Password')}</Form.Label>
                    <Form.Control type="password" ref={confirmedPassword} isInvalid={confirmedPasswordValidation} onBlur={handleConfirmPasswordChange} />
                    <Form.Control.Feedback type="invalid">{t('passwordMatchError')}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>{t('Username')}</Form.Label>
                    <Form.Control type="text" ref={username} isInvalid={usernameValidation} onBlur={handleUsernameChange} />
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

export default RegisterForm