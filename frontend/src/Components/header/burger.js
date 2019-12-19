import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import anime from 'animejs'

export function BurgerNav() {
    const basicTimeline = anime.timeline()
    const burgerReference = useRef(null)
    const burgerState = useSelector(state => state.burger.burgerTurn)

    if (burgerState) {
        basicTimeline
            .add({
                targets: burgerReference.current,
                duration: 400,
                translateX: 300,
                easing: 'easeInOutQuad'
            })
    } else {
        basicTimeline
            .add({
                targets: burgerReference.current,
                duration: 400,
                translateX: 0,
                easing: 'easeInOutQuad'
            })
    }
    return (
        <div ref={burgerReference} className="burgerNav">
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
