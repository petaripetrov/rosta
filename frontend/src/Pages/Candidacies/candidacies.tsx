import React from 'react'
import { useHistory } from 'react-router-dom'
import { SubmitCandidacy } from './submitCandidacy'
import { VoteCandidacy } from './voteCandidacy'

export const Candidacies = (props: any) => {

    const history = useHistory()

    function redirect(){
        history.push("/submitCandidacy")
    }

    return (
        <div>

            {/* Remove SubmitCandidacy from here. Its Just for test */}
            {/* <VoteCandidacy></VoteCandidacy> */}
            <SubmitCandidacy></SubmitCandidacy>
        </div>
    )
}

// TODO