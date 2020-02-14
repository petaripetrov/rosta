import React, { useState, FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

interface ToasterParams {
    color: string
    message: string
}

export const ProgressBar: FunctionComponent = () => {
    const dispatch = useDispatch()
    const apiPending = useSelector((state: any) => state.api.pending)
    const [props, setProps] = useState('disabled')

    // Regular Toaster Handle
    useEffect(() => {
        if (apiPending === true) {
            setProps('progress')
        } else {
            setProps('progress d-none')
        }
    }, [apiPending, dispatch])
    return (
        // <Toast show={show} className="toast">
        //     <Toast.Header closeButton={false} style={{
        //         backgroundColor: toasterParams.color
        //     }}>
        //         <strong>{'Rösta'}</strong>
        //     </Toast.Header>
        //     <Toast.Body>{toasterParams.message}</Toast.Body>
        // </Toast>

        <progress className={'progressBar ' + props} max={100}/>
    )
}