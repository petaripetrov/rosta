import React from 'react'
import ReactDom from 'react-dom'
import anime from 'animejs'

export class BurgerNav extends React.Component {
    myRef = React.createRef()
    isHidden = false;

    componentDidUpdate() {
        if (this.isHidden) {
            var basicTimeline = anime.timeline();
            basicTimeline
                .add({
                    targets: this.myRef.current,
                    duration: 500,
                    translateX: 0,
                    easing: 'easeInOutQuad'
                })
            this.isHidden = false;
        } else {
            var basicTimeline = anime.timeline();
            basicTimeline
                .add({
                    targets: this.myRef.current,
                    duration: 500,
                    translateX: -310,
                    easing: 'easeInOutQuad'
                })
            this.isHidden = true;
        }

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
