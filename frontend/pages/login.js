import { useState, useRef, FormEvent } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import useAPI from '../components/useAPI'


const LoginForm = () => {
    const { t } = useTranslation()
    const disaptch = useDispatch()
    const password = useRef()
    const router = useRouter()
    const email = useRef()
    const dispatch = useDispatch()

    let [emailValidation, setEmailValidation] = useState()
    let [passwordValidation, setPasswordValidation] = useState()

    function loginUser(inputs) {

        fetch('https://localhost:44375/login', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()
        ).then(data => {
            let token = data.access_token
            router.push('/menu')
            dispatch({
                type: 'LOGIN_USER',
                payload: token
            })
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (emailValidation === false && passwordValidation === false) {
            loginUser({ email: email.current.value, password: password.current.value })
        }
    }


    function handleEmailChange(event) {
        if (!event.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailValidation(true)

        } else {
            setEmailValidation(false)
        }
    }

    function handlePasswordChange(event) {
        if (!event.target.value.match(/.{8,}$/)) {
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