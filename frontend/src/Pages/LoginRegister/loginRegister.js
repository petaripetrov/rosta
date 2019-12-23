import React, { useState, useRef } from 'react'
import './loginRegister.css'
import { Form, Button } from 'react-bootstrap'

export const LoginRegister = (props, state) => {
    const [validated, setValidated] = useState(false)

    const email = useRef()
    const password = useRef()


    const handleSubmit = event => {

        event.preventDefault()
        alert(`pass API request with ${email.current.value} & ${password.current.value}`)

    }

    const onChangeEmail = event => {
        console.log(password.current.value)
    }

    if (props.type === 'login') {
        return (
            <Form onSubmit={handleSubmit} className="loginForm">
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required="true" type="email" ref={email} onChange={onChangeEmail} placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required="true" type="password" ref={password} placeholder="Password" />
                </Form.Group>

                <br />
                <Form.Group>
                    <Button required variant="primary" type="submit" className="loginSubmitButton">
                        {'Submit'}
                    </Button>
                </Form.Group>
                <Form.Group className="loginRegisterButton">
                    <Button variant="primary" className="formRegisterButton">
                        {'Register'}
                    </Button>
                </Form.Group>
            </Form>
        )
    } else if (props.type === 'register') {
        return (
            <Form onSubmit={handleSubmit} className="registerForm">
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="loginRegisterButton">
                    <Button variant="primary" type="submit" className="registerSubmitButton">
                        {'Submit'}
                    </Button>
                </Form.Group>
            </Form>
        )
    } else {
        return (
            'Specify valid type'
        )
    }
}