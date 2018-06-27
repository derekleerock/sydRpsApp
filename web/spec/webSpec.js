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
    describe('when the play use case tells the UI that the input is invalid', () => {
        it('tells the user that their input is invalid', () => {
            const domFixture = document.createElement('div')
            document.body.appendChild(domFixture)

            const alwaysInvalidRound = {
                play: (p1, p2, observer) => observer.invalidThrow()
            }

            ReactDOM.render(
                <RPSApp rounds={alwaysInvalidRound}/>,
                domFixture
            )

            expect(domFixture.innerText).not.toContain('INVALID!')
            document.querySelector('button').click()
            expect(domFixture.innerText).toContain('INVALID!')
        })
    })
})
