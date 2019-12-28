import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import anime from 'animejs'
import './header.css'
import { useHistory } from 'react-router-dom'

export const BurgerNav = () =>{
    const basicTimeline = anime.timeline()
    const burgerReference = useRef(null)
    const burgerState = useSelector(state => state.burger.burgerTurn)
    const options = useSelector(state => state.login.options)
    const history = useHistory()

    const burgerOptions = options ? options.map((option) =>
        <Button key={option} onClick={() => {
            history.push(`/${option}`.toLowerCase().replace(/\s/g, ''))
        }}className="burgerLink">
            <div className="burgerLinkText">{option}</div>
        </Button>) : <div>error</div>

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
            {burgerOptions}
        </div>
    )
}
