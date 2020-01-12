import React, { useState, FunctionComponent, useEffect } from 'react'
import { Toast } from 'react-bootstrap'
import { useSelector } from 'react-redux'

interface ToasterParams {
    color: string
    message: string
}

export const Toaster: FunctionComponent<{ initial?: ToasterParams }> = ({ initial }) => {
    const passedToaster = useSelector((state: any) => state.toast)
    const apiPending = useSelector((state: any) => state.api.pending)
    const [show, setShow] = useState(false)
    const [toasterParams, setToasterParamas] = useState(initial)

    // Regular Toaster Handcle
    useEffect(() => {
        if (Object.entries(passedToaster).length !== 0) {
            setToasterParamas(passedToaster)
            console.log(toasterParams)
            setShow(true)
        } else if (apiPending === true) {
            setToasterParamas({ color: 'black', message: 'Loading...' })
            setShow(true)
        } else if (apiPending === false) {
            setShow(false)
            setToasterParamas({ color: '', message: '' })
        }
    }, [passedToaster, apiPending])

    if (toasterParams === undefined) {
        return (
            <Toast show={false}>
            </Toast>
        )
    } else {
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
}