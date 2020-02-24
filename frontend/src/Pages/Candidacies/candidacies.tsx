import React,{useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { SubmitCandidacy } from './submitCandidacy'
import { VoteCandidacy } from './voteCandidacy'
import { useTranslation } from 'react-i18next'
import useAPI from '../../Services/API'

export const Candidacies = (props: any) => {

    enum Mode{
        'Submit',
        'ShowCandidacies',
        'Vote'

    }

    const {t} = useTranslation()
    const history = useHistory()
    const container = useRef<any>(null)
    const addYoursButton = useRef<any>(null)
    const [mode, setMode ]= useState(Mode.ShowCandidacies)
    function redirect(){
        history.push("/submitCandidacy")
    }

    function addYours(){
        setMode(Mode.Submit)
        //container.current.value = <SubmitCandidacy></SubmitCandidacy>
        console.log("loading submit")
    }

    return (
        <div >

        <div></div>
            {/* Remove SubmitCandidacy from here. Its Just for test */}
            <div ref= {container}>
            { mode ===  Mode.ShowCandidacies ? 
            <div>
                <VoteCandidacy ></VoteCandidacy> 
                <button className= "btn addYoursButton" ref={addYoursButton} onClick =  {addYours}>{t('add_Yours')}</button>
            </div>
            
            : <SubmitCandidacy></SubmitCandidacy>}
            </div>
            
        </div>
    )
}

// TODO