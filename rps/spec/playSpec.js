function Round() {
    this.play = (player1Throw, player2Throw, observer) => {
        if (['rock', 'scissors', 'paper'].includes(player1Throw) === false ||
            ['rock', 'scissors', 'paper'].includes(player2Throw) === false) {
            observer.invalid()
        } else if (player1Throw === player2Throw) {
            observer.tie()
        } else if (player1Throw === 'rock' && player2Throw === 'scissors' ||
            player1Throw === 'scissors' && player2Throw === 'paper' ||
            player1Throw === 'paper' && player2Throw === 'rock') {
            observer.player1Wins()
        } else {
            observer.player2Wins()
        }
    }
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
