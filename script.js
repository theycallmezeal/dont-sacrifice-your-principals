var app = document.getElementById('app');
var five = 5;
var originalCards = [
    { l2: "der Computer", l1: "the computer", isBase: true },
    { l2: "Tage", l1: "days" },
    { l2: "jeden Tag", l1: "every day" },
    { l2: "an einem Tag", l1: "on a day" },
    { l2: "sein", l1: "to be", isBase: true },
    { l2: "ich bin", l1: "I am" },
    { l2: "ich war", l1: "I was" },
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

        return <p id="card" onClick={this.props.flip}>{cardContent}</p>;
    }
}

class FlashcardSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards,
            currentCard: 0,
            isFront: true,
            shuffle: false,
            baseWordsOnly: true,
            startWithL1: true
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
                newCards = originalCards.slice();

                if (state.baseWordsOnly) {
                    newCards = newCards.filter(card => card.isBase);
                }

                if (state.shuffle) {
                    shuffleArray(newCards);
                }
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
            this.setState({shuffle: value});
        } else if (name == "base-words-only") {
            this.setState({baseWordsOnly: true})
        } else if (name == "all-word-details") {
            this.setState({baseWordsOnly: false})
        } else if (name == "start-with-l1") {
            this.setState({startWithL1: true})
        } else if (name == "start-with-l2") {
            this.setState({startWithL1: false})
        }
        
        else {
            console.log(name + " " + value);
        }
    }

    render() {
        var i = this.state.currentCard;
        var l1 = this.state.cards[i].l1;
        var l2 = this.state.cards[i].l2;
        var front = this.state.startWithL1 ? l1 : l2;
        var back = this.state.startWithL1 ? l2 : l1;

        var width = (i + 1) / this.state.cards.length * 100;
        var widthStyle = {width: width + "%"};
        console.log(width);
        return (
            <div id="app-container">
                <div id="settings-panel">
                    <h1>German vocabulary</h1>
                    <p><button onClick={this.resetCards}>Restart</button></p>
                    <p><input type="checkbox" name="shuffle" id="shuffle" checked={this.state.shuffle} onChange={this.updateInput}></input><label htmlFor="shuffle">Shuffle</label></p>
                    <hr></hr>
                    <p><input type="checkbox" name="base-words-only" id="base-words-only" checked={this.state.baseWordsOnly} onChange={this.updateInput}></input><label htmlFor="base-words-only">Base Words Only</label></p>
                    <p><input type="checkbox" name="all-word-details" id="all-word-details" checked={!this.state.baseWordsOnly} onChange={this.updateInput}></input><label htmlFor="all-word-details">All Word Details</label></p>
                    <hr></hr>
                    <p><input type="checkbox" name="start-with-l1" id="start-with-l1" checked={this.state.startWithL1} onChange={this.updateInput}></input><label htmlFor="start-with-l1">Start with English</label></p>
                    <p><input type="checkbox" name="start-with-l2" id="start-with-l2" checked={!this.state.startWithL1} onChange={this.updateInput}></input><label htmlFor="start-with-l2">Start with German</label></p>
                </div>
                <div id="card-and-controls">
                    <Card flip={this.flip} isFront={this.state.isFront} front={front} back={back}></Card>
                    <div id="progress-bar-wrapper">
                        <div id="progress-bar" style={widthStyle}></div>
                    </div>
                    <div id="controls">
                        <p><button class="primary-button" onClick={this.decrement}>&larr;</button></p>
                        <p id="progress-num"><strong>{i + 1}</strong> / <strong>{this.state.cards.length}</strong></p>
                        <p><button class="primary-button" onClick={this.increment}>&rarr;</button></p>
                    </div>
                    <p id="instructions">
                        FLIP CARD: <span class="boxed-text">&uarr;</span> <span class="boxed-text">&darr;</span>
                        &nbsp;PREV / NEXT: <span class="boxed-text">&larr;</span> <span class="boxed-text">&rarr;</span>
                    </p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <FlashcardSession cards={originalCards}></FlashcardSession>,
    app
);