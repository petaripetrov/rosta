import React, { useRef, FunctionComponent, useState, InputHTMLAttributes} from 'react'
import { useTranslation } from 'react-i18next'
import { CandidacyInput } from '../../types'
import './candidacies.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'




export const SubmitCandidacy: FunctionComponent<{intial?:CandidacyInput}> = ({intial}) => {

    const name = useRef<any>()
    const description = useRef<any>()
    const photo = useRef<any>()
    const history = useHistory()
    const submitBtn = useRef<any>();

    const authcode = useSelector((state:any) => state.user.authCode)
    const { t } = useTranslation()

    function submit(){

        let candidacyId:number = 0

        let candidacy:CandidacyInput = {
            name: name.current.value,
            description: description.current.value
        }
        submitBtn.current.disabled = true;
        fetch(`https://localhost:5001/submitCandidacy`,{
            method: 'POST',
            body: JSON.stringify(candidacy),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authcode}`
            }
        }).then(response => response.json()).then(response => {
            candidacyId = response['id']
            addPhoto(candidacyId);
            
        })
        submitBtn.current.disabled = false;
        
    }

    function cancel(){
        history.push('/menu')
    }

    function addPhoto(candidacyId:number){
        fetch(`https://localhost:44375/addCandidacyPhoto`,{
            method: 'POST',
            body: photo.current.files[0],
            headers: {
                'Content-Type': 'image/jpeg',
                'Authorization': `Bearer ${authcode}`
            }
        }).then(resp => {
            if (resp.ok) {
                history.push('/menu')
            } else {
                throw Error(`Request rejected with status ${resp.status}`)
            }
        }).catch(error => console.log(error))
    }

    return (
        <div>
            <div className="formContainer">
                <form>
                    <div className="form-group nameGroup">
                        <label className="form-label">{t('name')}</label>
                        <input type="text" className="form-input nameField" ref={ name}></input>
                    </div>
                    <div className="form-group descriptionGroup">
                        <label className="form-label">{t('description')}</label>
                        <textarea className="form-input descriptionField" ref={ description}></textarea>
                    </div>
                    <div className="form-group photoGroup">
                        <label className="form-label">{t('photo')}</label>
                        <input type="file" className="form-input photoInput" ref = {photo}></input>
                    </div>

                    
                </form>
            </div>
            
            <div className="buttonsContainer">
                <div className="buttonsInternalContainer">
                    <button className = "btn btn-primary btn-lg mx-2 float-left" ref = {submitBtn}onClick= {submit}>{t('submit')}</button>
                    <button className = "btn btn-primary btn-lg mx-2 float-right" onClick = {cancel}>{t('cancel')}</button>
                </div>
               
            </div>

        </div>
    )
}

// TODO