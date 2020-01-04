export const SELECT_SURVEY = 'SELECT_SURVEY'
export const UN_SELECT_SURVEY = 'UN_SELECT_SURVEY'

export const FETCH_SURVEYS_PENDING = 'FETCH_SURVEYS_PENDING'
export const FETCH_SURVEYS_SUCCESS = 'FETCH_SURVEYS_SUCCESS'
export const FETCH_SURVEYS_ERROR = 'FETCH_SURVEYS_ERROR'

function fetchSurveysPending() {
    return {
        type: FETCH_SURVEYS_PENDING
    }
}

function fetchSurveysSuccess(surveys) {
    return {
        type: FETCH_SURVEYS_SUCCESS,
        surveys: surveys
    }
}

function fetchSurveysError(error) {
    return {
        type: FETCH_SURVEYS_ERROR,
        error: error
    }
}

function fetchSurveys() {
    return dispatch => {
        dispatch(fetchSurveysPending())
        fetch('https://localhost:44375/getAllSurveys/1')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                console.log(res)
                dispatch(fetchSurveysSuccess(res))
                return res.posts
            })
            .catch(error => {
                dispatch(fetchSurveysError(error));
            })
    }
}

export default fetchSurveys
