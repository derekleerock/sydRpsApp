import React from 'react'

export default class RPSApp extends React.Component {
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
