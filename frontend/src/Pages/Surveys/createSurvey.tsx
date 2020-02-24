import React, { useRef, FunctionComponent, useState, InputHTMLAttributes} from 'react'
import { useTranslation } from 'react-i18next'
import {SurveyInput, OptionInput } from '../../types'
import { Surveys } from './surveySelection';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'


/**
 * Renders a form for submiting a survey
 * @param {Object} initial - empty object of type survey to map form input to
 */

const CreateSurvey: FunctionComponent<{ initial?: SurveyInput }> = ({initial}) => {

    const { t } = useTranslation()
    const history = useHistory()
    const [surveyState, setSurveyState] = useState(initial);
    const [optionsState, setOptionsState] = useState(new Array<OptionInput>())
    const color = useRef<any>(null)
    const name = useRef<any>(null)
    const endDate = useRef<any>(null)
    const description = useRef<any>(null)
    const photo = useRef<any>(null)

    const authcode = useSelector((state:any) => state.user.authCode)

    const OptionsTable: FunctionComponent<{ initial?: Array<OptionInput> }> = (initial) => {
        
        const nameInput = useRef<any>(null)
        const table = useRef<any>(null)
       
        
        function updateTable(optionName:string){
            let temp = optionsState || new Array<OptionInput>();
            let row = document.createElement("tr");
            let content = document.createElement("td")
            content.textContent = `${optionName}`
            row.append(content)            
    
            let newOption = {'id': 0,'name':optionName}
    
            table.current.append(row)
            temp.push(newOption);
            setOptionsState(temp)
        }
    
        return (
            <div className="tableContainer" id="tableContainer" >
                <table className= "table addOptionName" ref= {table}>
                    <thead>
                        <tr>
                            <th>{t('name')}</th>
                            <th><button className = "btn btn-primary float-right"onClick = {() => updateTable(nameInput.current.value)}>{t('add')}</button></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        <tr>
                           <input className = "nameFieldTable" type="text" name="" id="optionName" ref={nameInput}/>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        )
    }

    function uploadPhoto(surveyId: number){
        

        fetch(`https://localhost:5001/addSurveyPhoto/${surveyId}`,{
        method: 'POST',
        body: photo.current.files[0],
        headers: {
            'Content-Type': 'image/jpeg',
            'Authorization': `Bearer ${authcode}`
        }
       }).then(resp => {
        if (resp.ok) {
            history.push('/surveys')
        } else {
            throw Error(`Request rejected with status ${resp}`)
        }
    }).catch(error => console.log(error))
        
    }
    function cancel(){
        history.push('/surveys')
    }

    function submit(){
        let surveyId =0;
        
        let startDate:Date = new Date();
         startDate.setMinutes(startDate.getMinutes() +2) 
       let survey:SurveyInput = {
            'Name': name.current.value,
            'StartDate': startDate,
            'EndDate': endDate.current.value,
            'Description': description.current.value,
            'PhotoPath': "",
            'Color': color.current.value,
            'Options': optionsState
       }
       
        fetch('https://localhost:44375/submitSurvey',{
        method: 'POST',
        body: JSON.stringify(survey),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authcode}`
        }
        })
       .then(response => response.json())
       .then(response => {
           console.log(response)
           surveyId = response['id']
           uploadPhoto(surveyId)
        })
       .catch(error => console.log(error))
    

        

    }


    return (
        <div>
             <form className="form createSurveyForm "> 
                <div className="form-group surveyNameGroup">
                    <label className="form-label">{t('name')}</label>
                    <input className="form-input nameField" type="text" ref= {name}/>
                </div>
                        
                <div className="form-group descriptionGroup">
                    <label className="form-label">{t('description')}</label>
                    <textarea className="form-input descriptionField" rows={8} ref={description} />
                </div>
                        

                <div className= "ColorPhotoEndDateContainer">
                    <div className="form-group surveyEndDateGroup" >
                        <label className="form-label">{t('endDate')}</label>
                        <input className="survey-endDate-input" type="date" ref={endDate}></input>
                    </div>
                    <div className="form-group surveyColorGroup"> 
                        <label className= "form-label ">{t('color')}</label>
                        <input className="survey-color-input" type="color" ref ={color}/>
                    </div>
                    <div className="form-group surveyPhotoGroup">
                        <label className="form-label photo-label">{t('photo')}</label>
                        <input className="photo-input" type="file" accept="image/jpeg" ref= {photo}></input>
                    </div>
                </div>

            </form>
            <OptionsTable initial = {new Array<OptionInput>()}></OptionsTable>
            <div className="buttonsContainer">
                <div className="buttonsInternalContainer">
                    <button className = "btn btn-primary btn-lg mx-2 t-centered" onClick= {submit}>{t('submit')}</button>
                    <button className = "btn btn-primary btn-lg mx-2 t-centered" onClick = {cancel}>{t('cancel')}</button>
                </div>
               
            </div>
           
        </div>
       
        
       
        
    )
}

export default CreateSurvey