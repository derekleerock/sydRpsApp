function Round() {
    this.play = (player1Throw, player2Throw, observer) => {
        new PlayRound(player1Throw, player2Throw, observer).process()
    }
}

function PlayRound(player1Throw, player2Throw, observer) {
    this.process = () => {
        if (invalid(player1Throw) || invalid(player2Throw)) {
            observer.invalid()
        } else if (tie()) {
            observer.tie()
        } else if (player1WinsScenarios()) {
            observer.player1Wins()
        } else {
            observer.player2Wins()
        }
    }

    function tie() {
        return player1Throw === player2Throw
    }

    function player1WinsScenarios() {
        return player1Throw === THROW.ROCK && player2Throw === THROW.SCISSORS ||
            player1Throw === THROW.SCISSORS && player2Throw === THROW.PAPER ||
            player1Throw === THROW.PAPER && player2Throw === THROW.ROCK
    }

    function invalid(playerThrow) {
        return VALID_THROWS.includes(playerThrow) === false
    }
    
    const THROW = {
        ROCK: 'rock',
        SCISSORS: 'scissors',
        PAPER: 'paper'
    }

    const VALID_THROWS = [THROW.ROCK, THROW.SCISSORS, THROW.PAPER]
}

describe('play', () => {
    let round, observer

    beforeEach(() => {
        round = new Round()
    })

    describe('player 1 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['player1Wins'])
        })

        it('rock vs scissors', () => {
            round.play('rock', 'scissors', observer)
            expect(observer.player1Wins).toHaveBeenCalled()
        })

        it('scissors vs paper', () => {
            round.play('scissors', 'paper', observer)
            expect(observer.player1Wins).toHaveBeenCalled()
        })

        it('paper vs rock', () => {
            round.play('paper', 'rock', observer)
            expect(observer.player1Wins).toHaveBeenCalled()
        })
    })

    describe('player 2 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['player2Wins'])
        })

        it('scissors vs rock', () => {
            round.play('scissors', 'rock', observer)
            expect(observer.player2Wins).toHaveBeenCalled()
        })

        it('paper vs scissors', () => {
            round.play('paper', 'scissors', observer)
            expect(observer.player2Wins).toHaveBeenCalled()
        })

        it('rock vs paper', () => {
            round.play('rock', 'paper', observer)
            expect(observer.player2Wins).toHaveBeenCalled()
        })
    })

    describe('tie scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['tie'])
        })

        it('rock vs rock', () => {
            round.play('rock', 'rock', observer)
            expect(observer.tie).toHaveBeenCalled()
        })

        it('scissors vs scissors', () => {
            round.play('scissors', 'scissors', observer)
            expect(observer.tie).toHaveBeenCalled()
        })

        it('paper vs paper', () => {
            round.play('paper', 'paper', observer)
            expect(observer.tie).toHaveBeenCalled()
        })
    })

    describe('invalid scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['invalid'])
        })

        it('invalid vs rock', () => {
            round.play('invalid throw', 'rock', observer)
            expect(observer.invalid).toHaveBeenCalled()
        })

        it('rock vs invalid', () => {
            round.play('rock', 'invalid throw', observer)
            expect(observer.invalid).toHaveBeenCalled()
        })

        it('invalid vs invalid', () => {
            round.play('invalid throw', 'spock', observer)
            expect(observer.invalid).toHaveBeenCalled()
        })
    })
})
