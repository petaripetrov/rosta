import React from 'react'
import { useHistory } from 'react-router-dom'
import { SubmitCandidacy } from './submitCandidacy'

export const Candidacies = (props: any) => {

    const history = useHistory()

    function redirect(){
        history.push("/submitCandidacy")
    }

    return (
        <div>

            {/* Remove SubmitCandidacy from here. Its Just for test */}
            <SubmitCandidacy></SubmitCandidacy>
            <button onClick = {redirect}>Submit Survey</button>
        </div>
    )
}

// TODO