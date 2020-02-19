import { LANGUAGE_CHANGE_BG, LANGUAGE_CHANGE_EN } from '../Actions'
import i18n from '../../i18n/i18n'
import { Action } from 'redux'

export const translationReducer = (state = {language: 'en'}, action: Action) => {

    switch (action.type) {
        case LANGUAGE_CHANGE_EN:

            i18n.changeLanguage('en')

            return {
                ...state,
                language: 'en'
            }
        case LANGUAGE_CHANGE_BG:

            i18n.changeLanguage('bg')

            return {
                ...state,
                language: 'bg'
            }

        default:

            return state
    }
}