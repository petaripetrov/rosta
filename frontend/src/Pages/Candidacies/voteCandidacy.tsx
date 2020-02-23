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
    
    

    
    function update(){
        console.log(candidacies)
        photos.map((x: { photoLink: string }) => appenndNewCandidacyContainer(x.photoLink))
        console.log(intialPhotos)
        
    }

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

    function appenndNewCandidacyContainer(photoLink:string){
        let photo = document.createElement("img")
        photo.className = "candidacyPhoto"
        photo.setAttribute("src",photoLink)
        let container = document.createElement("div")
        container.className = "candidacyContainer"
        container.append(photo);
    
        candidaciesContainer.current.append(container)
        
    }
    function getPhotoLink(candidacyId:number){
         fetch(`https://localhost:5001/getCandidacyPhoto/${candidacyId}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authcode}`
            }
        }).then(response => response.json())
        .then(response => {
            let photoLinks = photos.map((x: { photoLink: string }) => x.photoLink)
            photoLinks.push(response["url"])
        })
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