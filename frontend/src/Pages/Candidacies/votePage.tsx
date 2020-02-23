import React, { useRef, FunctionComponent, useState, InputHTMLAttributes,useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { CandidacyInput, Candidacy ,CandidacyVoteInput} from '../../types'
import './candidacies.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Candidacies } from './candidacies'
import useAPI from '../../Services/API'

export const VotePage: FunctionComponent<{intial?:Candidacy | undefined}> = ({intial}) => {

    const history = useHistory()
    const {t} = useTranslation()
    const authcode = useSelector((state:any) => state.login.authCode)
    const candidacies =  useAPI('candidacies')
    const photos = useAPI('candidaciesPhotos')
    const [candidaciesState, setCandidaciesState] = useState(new Array<Candidacy>()) //useState([]);
    const candidaciesContainer = useRef<any>()
    const name = useRef<any>()
    const description = useRef<any>()
    const photo = useRef<any>()
    
    useEffect(() => {
        name.current.value = intial?.name
        description.current.value = intial?.description
    }) 
    
    function cancel(){
        history.push('/menu')
    }

    function vote(){

        let candidacyId = intial?.id;
        let voteInput: CandidacyVoteInput = {'candidacyId': candidacyId}
        

        fetch(`https://localhost:5001/submitCandidacyVote`,{
            method: 'POST',
            body: JSON.stringify(voteInput),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authcode}`
            }
        })
    }

    //Return in tempolary 

    return(
        <div>
            <div className="formContainer">
                <form>
                    <div className="form-group nameGroup">
                        <label className="form-label">{t('name')}</label>
                        <input type="text" className="form-input nameField"  ref={ name} readOnly></input>
                    </div>
                    <div className="form-group descriptionGroup">
                        <label className="form-label">{t('description')}</label>
                        <textarea className="form-input descriptionField"  ref={ description }readOnly></textarea>
                    </div>
                    

                    
                </form>
            </div>
            
            <div className="buttonsContainer">
                <div className="buttonsInternalContainer">
                    <button className = "btn btn-primary btn-lg mx-2 float-left" onClick= {vote}>{t('vote')}</button>
                    <button className = "btn btn-primary btn-lg mx-2 float-right" onClick = {cancel}>{t('cancel')}</button>
                </div>
            
            </div>

        </div>
    )
}