var app = document.getElementById('app');
var five = 5;
var originalCards = [
    {
        l2: "der Tag",
        l1: "the day",
        isBase: true
    },
    {
        l2: "Tage",
        l1: "days"
    },
    {
        l2: "jeden Tag",
        l1: "every day"
    },
    {
        l2: "sein",
        l1: "to be",
        isBase: true
    },
    {
        l2: "ich bin",
        l1: "I am"
    },
    {
        l2: "ich war",
        l1: "I was"
    }
]

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var cardContent = this.props.isFront ? this.props.front : this.props.back;

        return <h1 onClick={this.props.flip}>{cardContent}</h1>;
    }
}

class FlashcardSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards,
            currentCard: 0,
            isFront: true,
            shuffle: true,
            baseWordsOnly: true
        };

        this.flip = this.flip.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.resetCards = this.resetCards.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    flip() {
        this.setState(
            function(state) {
                return {isFront: !state.isFront}
            }
        )
    }

    increment() {
        this.setState(
            function(state) {
                if (state.currentCard == state.cards.length - 1) {
                    return {isFront: true};
                }
                return {
                    isFront: true,
                    currentCard: state.currentCard + 1
                };
            }
        );
    }

    decrement() {
        this.setState(
            function(state) {
                if (state.currentCard == 0) {
                    return {isFront: true};
                }
                return {
                    isFront: true,
                    currentCard: state.currentCard - 1
                };
            }
        );
    }

    resetCards() {
        this.setState(
            function(state) {
                /* originalCards.slice() makes a copy */
                newCards = state.shuffle ? shuffleArray(originalCards.slice()) : originalCards;
                return {
                    cards: newCards,
                    currentCard: 0,
                    isFront: true
                };
            }
        )
    }

    updateInput(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if (name == "shuffle") {
            this.setState({"shuffle": value});
        } else if (name == "base-words-only") {
            this.setState({baseWordsOnly: value})
        } else if (name == "all-word-details") {
            this.setState({baseWordsOnly: !value})
        } else {
            console.log(name + " " + value);
        }
    }

    render() {
        var i = this.state.currentCard;
        return (
            <div>
                <Card flip={this.flip} isFront={this.state.isFront} front={this.state.cards[i].l1} back={this.state.cards[i].l2}></Card>
                <div>
                    <p><button onClick={this.decrement}>&larr;</button></p>
                    <p>{i + 1} / {this.state.cards.length}</p>
                    <p><button onClick={this.increment}>&rarr;</button></p>
                </div>
                <p><button onClick={this.resetCards}>Restart</button></p>
                <p><input type="checkbox" name="shuffle" id="shuffle" checked={this.state.shuffle} onChange={this.updateInput}></input><label htmlFor="shuffle">Shuffle</label></p>
                <p><input type="checkbox" name="base-words-only" id="base-words-only" checked={this.state.baseWordsOnly} onChange={this.updateInput}></input><label htmlFor="base-words-only">Base Words Only</label></p>
                <p><input type="checkbox" name="all-word-details" id="all-word-details" checked={!this.state.baseWordsOnly} onChange={this.updateInput}></input><label htmlFor="all-word-details">All Word Details</label></p>
            </div>
        );
    }
}

ReactDOM.render(
    <FlashcardSession cards={originalCards}></FlashcardSession>,
    app
);