import React, { useRef, useState } from 'react'
import './loginRegister.css'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export const LoginRegister = props => {
    
    const history = useHistory()
    const email = useRef()
    const password = useRef()
    const confirmedPassword = useRef()
    const username = useRef()
    const [passwordValidity, setPasswordValidity] = useState()


    const handleLoginSubmit = event => {
        event.preventDefault()
        alert(`pass API request to login with ${email.current.value} & ${password.current.value}`)
    }

    const handleRegisterSubmit = event => {
        if (passwordValidity) {
            event.preventDefault()
        } else {
            event.preventDefault()
            alert(`pass API request to register with ${email.current.value} & ${password.current.value} & ${username.current.value}`)
        }
    }

    const validatePassword = () => {
        if (password.current.value !== '' && confirmedPassword.current !== '') {
            if (password.current.value === confirmedPassword.current.value) {
                setPasswordValidity(passwordValidity => passwordValidity = false)
            } else {
                setPasswordValidity(passwordValidity => passwordValidity = true)
            }
        } else {
            setPasswordValidity(passwordValidity => passwordValidity = true)
        }
    }

    if (props.type === 'login') {
        return (
            <Form onSubmit={handleLoginSubmit} className="loginForm">
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required={true} type="email" ref={email} placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required={true} type="password" ref={password} placeholder="Password" />
                </Form.Group>

                <br />
                <Form.Group>
                    <Button variant="primary" type="submit" className="loginSubmitButton">
                        {'Submit'}
                    </Button>
                </Form.Group>
                <Form.Group className="loginRegisterButton">
                    <Button variant="primary" className="formRegisterButton" onClick={() => {
                        history.push('/register')
                    }}>
                        {'Register'}
                    </Button>
                </Form.Group>
            </Form>
        )
    } else if (props.type === 'register') {
        return (
            <Form onSubmit={handleRegisterSubmit} className="registerForm">
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required={true} type="email" ref={email} placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required={true} type="password" ref={password} isInvalid={passwordValidity} onChange={validatePassword} placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required={true} type="password" ref={confirmedPassword} isInvalid={passwordValidity} onChange={validatePassword} placeholder="Confirm Password" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required={true} type="text" ref={username} placeholder="Username" />
                </Form.Group>

                <Form.Group className="registerSubmitGroup">
                    <Button variant="primary" type="submit" className="registerSubmitButton">
                        {'Submit'}
                    </Button>
                </Form.Group>
            </Form>
        )
    }
}