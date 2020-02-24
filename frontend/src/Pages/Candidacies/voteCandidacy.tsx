import React, { useRef, FunctionComponent, useState, InputHTMLAttributes,useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { CandidacyInput, Candidacy } from '../../types'
import './candidacies.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Candidacies } from './candidacies'
import useAPI from '../../Services/API'
import { VotePage } from './votePage'
import SelectedSurvey from '../Surveys/selectedSurvey'

export const VoteCandidacy: FunctionComponent = () => {

    enum Mode{
        'Candidacies',
        'Vote'
    }

    const history = useHistory()
    const {t} = useTranslation()
    const authcode = useSelector((state:any) => state.login.authCode)
    const candidacies =  useAPI('candidacies')
    const photos = useAPI('candidaciesPhotos')
    const [mode,setMode] = useState('Candidacies')
    const [selectedCandidacy,setSelectedCandidacy] = useState()
    
   
    const candidaciesContainer = useRef<any>()
    

    const intialPhotos =  photos != undefined ?
        photos.map((x: { photoLink: string | undefined,candidacyId: number|undefined }) => 
        <div className = "candidacyContainer" id={x.candidacyId?.toString()} onClick = { () =>redirect(candidacies.filter((y: { id: number | undefined }) => y.id ==x.candidacyId)[0])}>
            <img className ="candidacyPhoto" src= {x.photoLink}/>
        </div>)
    : <div>Fetching</div>
    
    function redirect(candidacy:Candidacy) {
        setSelectedCandidacy(candidacy)
        setMode('Vote')
    }

   
  

    //Return in tempolary 

    return(
        <div>
            {
                mode === 'Candidacies'? <div className="candiddaciesContainer" ref={candidaciesContainer}>
                {intialPhotos}
            </div>
            :<VotePage intial = {selectedCandidacy}></VotePage>
            }
            
            
           
        </div>
    )
}