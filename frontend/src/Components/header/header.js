import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container } from 'react-bootstrap'
import anime from 'animejs'
import { BurgerNav } from "./burger"

export class Header extends React.Component {
    state = { alteredPosition: true }
    myRef = React.createRef()

    render() {
        return (
            <div className="header" >
                <Button ref={this.myRef} className="burger"
                    onClick={() => {
                        this.setState({ alteredPosition: !this.state.alteredPosition, })
                        anime({
                            targets: this.myRef.current,
                            backgroundPositionX: '0px',
                            scale: {
                                value: [1, 0.8],
                                duration: 1000
                            },
                            scale:{
                                value: [0.8, 1],
                                duration: 1000
                            }
                        })
                }
                }>
                    <FontAwesomeIcon icon="bars" />
                </Button>
            <BurgerNav />
            <Container className="schoolName">
                {'School name goes here through API call'}
            </Container>
            </div >
        )
    }
}
