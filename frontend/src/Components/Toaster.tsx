import React, { useState, FunctionComponent, useEffect } from 'react'
import { Toast } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

interface ToasterParams {
    color: string
    message: string
}

export const Toaster: FunctionComponent<{ initial?: ToasterParams }> = ({ initial }) => {
    const dispatch = useDispatch()
    const apiPending = useSelector((state: any) => state.api.pending)
    const [show, setShow] = useState(false)
    const [toasterParams, setToasterParamas] = useState(initial)

    // Regular Toaster Handle
    useEffect(() => {
        if (apiPending === true) {
            setToasterParamas({ color: 'black', message: 'Loading...' })
            setShow(true)
        } else {
            setShow(false)
        }
    }, [apiPending, dispatch])

    if (toasterParams === undefined) {
        return (
            null
        )
    } else {
        return (
            <Toast show={show} className="toast">
                <Toast.Header closeButton={false} style={{
                    backgroundColor: toasterParams.color
                }}>
                    <strong>{'Rösta'}</strong>
                </Toast.Header>
                <Toast.Body>{toasterParams.message}</Toast.Body>
            </Toast>
        )
    }
}