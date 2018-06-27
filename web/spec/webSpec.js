import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'

class RPSApp extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    inputChanged(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler() {
        this.props.round.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    player1Wins() {
        this.setState({gameResult: 'P1 Wins!!'})
    }

    player2Wins() {
        this.setState({gameResult: 'P2 Wins!!'})
    }

    tie() {
        this.setState({gameResult: 'TIE!'})
    }

    invalidInput() {
        this.setState({gameResult: 'INVALID!'})
    }

    render() {
        return (
            <div>
                {this.state.gameResult}
                <input name="p1Throw" onChange={this.inputChanged.bind(this)}/>
                <input name="p2Throw" onChange={this.inputChanged.bind(this)}/>
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

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('INVALID!')
        })

        it('displays INVALID when clicking play', () => {
            submitForm()


            expect(page()).toContain('INVALID!')
        })
    })

    describe('when the play use case tells the UI that the result is a tie', () => {
        beforeEach(() => {
            renderApp({play: (p1, p2, observer) => observer.tie()})
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('TIE!')
        })

        it('displays TIE when clicking play', () => {
            submitForm()
            expect(page()).toContain('TIE!')
        })
    })

    describe('when the play use case tells the UI that the result is player 1 wins', () => {
        beforeEach(() => {
            renderApp({play: (p1, p2, observer) => observer.player1Wins()})
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('P1 Wins!!')
        })

        it('displays P1 Wins!! when clicking play', () => {
            submitForm()
            expect(page()).toContain('P1 Wins!!')
        })
    })

    describe('when the play use case tells the UI that the result is player 2 wins', () => {
        beforeEach(() => {
            renderApp({play: (p1, p2, observer) => observer.player2Wins()})
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('P2 Wins!!')
        })

        it('displays P2 Wins!! when clicking play', () => {
            submitForm()
            expect(page()).toContain('P2 Wins!!')
        })
    })

    describe('submitting a game', () => {
        it('sends the users input to the play request', () => {
            let playSpy = jasmine.createSpy('playSpy')
            renderApp({play: playSpy})

            enterTextIntoInput('p1Throw', 'foo')
            enterTextIntoInput('p2Throw', 'bar')

            submitForm()

            expect(playSpy).toHaveBeenCalledWith('foo', 'bar', jasmine.any(Object))
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

    function enterTextIntoInput(inputName, inputValue) {
        let p1ThrowInput = document.querySelector('[name="' + inputName + '"]')
        p1ThrowInput.value = inputValue
        ReactTestUtils.Simulate.change(p1ThrowInput)
    }

    function submitForm() {
        document.querySelector('button').click()
    }
})
