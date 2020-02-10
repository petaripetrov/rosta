import React, { FunctionComponent} from 'react'
import { useTranslation } from 'react-i18next'
import { Survey } from '../../types'


/**
 * Renders a form for submiting a survey
 * @param {Object} initial - empty object of type survey to map form input to
 */
const CreateSurvey: FunctionComponent<{ initial?: Survey }> = ({ initial }) => {

    const { t } = useTranslation()

    return (
        <form>
            <div className="form-group surveyNameGroup">
                <div className="form-label">{t('name')}</div>
                <input className="form-input nameField" type="text" />
            </div>
            <div className="form-group descriptionGroup">
                <div className="form-label">{t('description')}</div>
                <textarea className="form-input descriptionField" rows={14} />
            </div>
            <div className="form-group">
                <div className="form-label">date</div>
                <input type="time"></input>
            </div>
        </form>
    )
}

export default CreateSurvey