import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationBg from './translations/bg.json'
import translationEn from './translations/en.json'


const resources = {
    en: {
        translation: translationEn
    },
    bg: {
        translation: translationBg
    }
}

/**
 * Setups i18n with 2 JSON resources
 */
i18n.use(initReactI18next)
    .init({
        resources,
        lng: "en",

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    })

export default i18n