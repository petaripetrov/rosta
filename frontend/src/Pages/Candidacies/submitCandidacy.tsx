import React, { useRef, FunctionComponent, useState, InputHTMLAttributes} from 'react'
import { useTranslation } from 'react-i18next'
import { CandidacyInput } from '../../types'
import './candidacies.css'


export const SubmitCandidacy: FunctionComponent<{intial?:CandidacyInput}> = ({intial}) => {

    const name = useRef<any>()
    const description = useRef<any>()
    const photo = useRef<any>()

    function submit(){

    }

    function cancel(){

    }

    return (
        <div>
            <div className="formContainer">
                <form>
                    <div className="form-group nameGroup">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-input nameField" ref={ name}></input>
                    </div>
                    <div className="form-group descriptionGroup">
                        <label className="form-label">Description</label>
                        <textarea className="form-input descriptionField" ref={ description}></textarea>
                    </div>
                    <div className="form-group photoGroup">
                        <label className="form-label">Photo</label>
                        <input type="file" className="form-input photoInput" ref = {photo}></input>
                    </div>

                    
                </form>
            </div>
            
            <div className="buttonsContainer">
                <div className="buttonsInternalContainer">
                    <button className = "btn btn-primary btn-lg mx-2 t-centered" onClick= {submit}>Submit</button>
                    <button className = "btn btn-primary btn-lg mx-2 t-centered" onClick = {cancel}>Candel</button>
                </div>
               
            </div>

        </div>
    )
}

// TODO