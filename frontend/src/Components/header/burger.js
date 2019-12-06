import React from 'react'
import ReactDom from 'react-dom'
import anime from 'animejs'

export class BurgerNav extends React.Component {
    myRef = React.createRef()

    componentDidUpdate() {

        var basicTimeline = anime.timeline();
        basicTimeline
            .add({
                targets: this.myRef.current,
                translateX: -310
            })
    }

    render() {
        const positionClass = this.props.alteredPosition ? 'otherPosition' : '';
        return (
            <div ref={this.myRef} className={"burgerNav" + positionClass}>
                <a href="/">Element 1</a>
                <a href="/">Element 1</a>
                <a href="/">Element 1</a>
            </div>
        )
    }
}
