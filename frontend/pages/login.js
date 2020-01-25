import { useState, useRef, FormEvent } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'


const LoginForm = () => {
    const { t } = useTranslation()
    const password = useRef()
    const router = useRouter()
    const email = useRef()
    const dispatch = useDispatch()

    let [emailValidation, setEmailValidation] = useState()
    let [passwordValidation, setPasswordValidation] = useState()

    function handleSubmit(event) {
        event.preventDefault()
        if (emailValidation === true || passwordValidation === true) {
            alert('error')
        } else if (email.current.value === 'admin@admin.com' && password.current.value === 'password') {
            dispatch({
                type: 'LOGIN_USER'
            })
            router.push('/menu')
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
        router.push('/register')
    }

    return (
        <Form onSubmit={handleSubmit} className="loginForm">
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

export default LoginForm