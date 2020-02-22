import React, { useRef, FunctionComponent, useState, InputHTMLAttributes} from 'react'
import { useTranslation } from 'react-i18next'
import { CandidacyInput } from '../../types'
import './candidacies.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export const VoteCandidacy: FunctionComponent<{intial?:CandidacyInput}> = ({intial}) => {

    const history = useHistory()
    const {t} = useTranslation()

    function fetchCandidacies(){

    }

    return(
        <div>
            <div>
                <div className= "candidacyContainer">
                    <img className= "candidacyPhoto"src="https://static.digg.com/images/edc62262d954489fb263cde1bc2cd43e_06440d94afda4f7a8b5f2268956c8716_1_post.jpeg" alt=""/>
                </div>
                <div className= "candidacyContainer">
                    <img className= "candidacyPhoto"src="https://static.digg.com/images/edc62262d954489fb263cde1bc2cd43e_06440d94afda4f7a8b5f2268956c8716_1_post.jpeg" alt=""/>
                </div>
                <div className= "candidacyContainer">
                    <img className= "candidacyPhoto"src="https://static.digg.com/images/edc62262d954489fb263cde1bc2cd43e_06440d94afda4f7a8b5f2268956c8716_1_post.jpeg" alt=""/>
                </div>
                <div className= "candidacyContainer">
                    <img className= "candidacyPhoto"src="https://static.digg.com/images/edc62262d954489fb263cde1bc2cd43e_06440d94afda4f7a8b5f2268956c8716_1_post.jpeg" alt=""/>
                </div>
                <div className= "candidacyContainer">
                    <img className= "candidacyPhoto"src="https://static.digg.com/images/edc62262d954489fb263cde1bc2cd43e_06440d94afda4f7a8b5f2268956c8716_1_post.jpeg" alt=""/>
                </div>
                <div className= "candidacyContainer">
                    <img className= "candidacyPhoto"src="https://static.digg.com/images/edc62262d954489fb263cde1bc2cd43e_06440d94afda4f7a8b5f2268956c8716_1_post.jpeg" alt=""/>
                </div>
                <div className= "candidacyContainer">
                    <img className= "candidacyPhoto"src="https://static.digg.com/images/edc62262d954489fb263cde1bc2cd43e_06440d94afda4f7a8b5f2268956c8716_1_post.jpeg" alt=""/>
                </div>
            </div>
            <div>
                <button className= "btn addYoursButton">{t('add_Yours')}</button>
            </div>
        </div>
    )
}