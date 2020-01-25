import { useDispatch } from 'react-redux'
import { Button, Container, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

const Menu = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation()

    function handleSurveyButton() {
        router.push('/surveys')
    }

    function handleCandidacyButton() {
        router.push('/candidacies')
    }

    function handleExitButton() {
        dispatch({ type: 'LOGOUT_USER' })
    }

    return (
        <Container>
            <ButtonGroup id="menu">
                <Button className="surveyMenuButton" onClick={handleSurveyButton}>
                    <div>{t('surveys')}</div>
                </Button>
                <Button className="candidacyButton" onClick={handleCandidacyButton}>
                    <div>{t('candidacies')}</div>
                </Button>
                <Button className="exitButton" onClick={handleExitButton}>
                    <div>{t('exit Account')}</div>
                </Button>
            </ButtonGroup>
        </Container>
    )
}

export default Menu