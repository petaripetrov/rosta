import React from 'react'
import './loginRegister.css'
import { Form, Button } from 'react-bootstrap'

export const LoginRegister = (props) => {

    return (
        <Form className="loginRegisterForm">
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <br />
            <Form.Group>
                <Button variant="primary" type="submit" className="formSubmitButton">
                    {'Submit'}
                </Button>
            </Form.Group>
            <Form.Group className="registerGroup">
                <Button variant="primary" className="formRegisterButton">
                    {'Register'}
                </Button>
            </Form.Group>
        </Form>
    )
}