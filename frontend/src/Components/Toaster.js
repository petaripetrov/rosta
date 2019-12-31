import React, { useState, useMemo } from 'react'
import { Toast } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const Toaster = () => {
    let toasterParams = useSelector(state => state.toast)
    const [show, setShow] = useState(false)

    useMemo(() => {
        if (!(Object.entries(toasterParams).length === 0 && toasterParams.constructor === Object)) {
            setShow(true)
        }
    }, [toasterParams])

    return (
        <Toast show={show} delay={1543} autohide onClose={() => setShow(false)} style={{
            position: "relative",
            margin: "0 auto",
            top: "55px"
        }}>
            <Toast.Header closeButton={false} style={{
                backgroundColor: toasterParams.color
            }}>
                <strong>{'Rösta'}</strong>
            </Toast.Header>
            <Toast.Body>{toasterParams.message}</Toast.Body>
        </Toast>
    )
}