import React from 'react'
import { Button } from 'react-bootstrap'
import store from '../../Store'
import { burgerTurn } from '../../Store/Actions/Burger'

export class BurgerNav extends React.Component {
    myRef = React.createRef()

    componentDidUpdate() {
        store.dispatch(burgerTurn(this.myRef))
    }

    render() {
        return (
            <div ref={this.myRef} className="burgerNav">
                <div className="transparentBar"></div>
                <Button className="burgerLink">
                    <div className="burgerLinkText">Users</div>
                </Button>
                <Button className="burgerLink">
                    <div className="burgerLinkText">Test</div>
                </Button>
            </div>
        )
    }
}
