import React from 'react'
import * as ReactDOM from 'react-dom'

class RPSApp extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    submitHandler() {
        this.setState({
            gameResult: 'INVALID!',
        })
    }

    render() {
        return (
            <div>
                {this.state.gameResult}
                <button onClick={this.submitHandler.bind(this)}>Play</button>
            </div>
        )
    }
}

describe('play form', function () {
    let domFixture

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        cleanupDOM()
    })

    describe('when the play use case tells the UI that the input is invalid', () => {
        beforeEach(function () {
            renderApp({play: (p1, p2, observer) => observer.invalidInput()})
        })

        it('tells the user that their input is invalid', () => {
            expect(page()).not.toContain('INVALID!')

            submitForm()

            expect(page()).toContain('INVALID!')
        })
    })

    function setupDOM() {
        domFixture = document.createElement('div')
        document.body.appendChild(domFixture)
    }

    function cleanupDOM() {
        domFixture.remove()
    }

    function renderApp(round) {
        ReactDOM.render(
            <RPSApp round={round}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText
    }

    function submitForm() {
        document.querySelector('button').click()
    }
})
