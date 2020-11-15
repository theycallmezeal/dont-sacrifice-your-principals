var app = document.getElementById('app');
var five = 5;
var originalCards = [
    { l2: "der Computer", l1: "the computer", isBase: true },
    { l2: "Computer", l1: "computers" },
    { l2: "am Computer", l1: "on the computer" },
    { l2: "die Webseite", l1: "the website", isBase: true },
    { l2: "Webseiten", l1: "websites" },
    { l2: "auf einer Webseite", l1: "on a website" },
    { l2: "schreiben", l1: "to write", isBase: true },
    { l2: "er/sie schriebt", l1: "he/she writes" },
    { l2: "schrieb", l1: "wrote (simple past)" },
    { l2: "hat geschrieben", l1: "has written (past perfect)" }
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
            cards: this.props.cards.filter(card => card.isBase),
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
                /* .slice() makes a copy */
                newCards = this.props.cards.slice();

                if (state.baseWordsOnly) {
                    newCards = newCards.filter(card => card.isBase);
                }

                if (state.shuffle) {
                    shuffleArray(newCards);
                }
                return {
                    cards: newCards,
                    currentCard: 0,
                    isFront: true,
                    haveControlsChanged: false
                };
            }
        )
    }

    updateInput(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        var stateChanges = {};

        if (name == "shuffle") {
            stateChanges.shuffle = value;
        } else if (name == "base-words-only") {
            stateChanges.baseWordsOnly = true;
        } else if (name == "all-word-details") {
            stateChanges.baseWordsOnly = false;
        } else if (name == "start-with-l1") {
            stateChanges.startWithL1 = true;
        } else if (name == "start-with-l2") {
            stateChanges.startWithL1 = false;
        }
        
        stateChanges.haveControlsChanged = true;
        
        this.setState(stateChanges);
    }

    render() {
        var i = this.state.currentCard;
        var l1 = this.state.cards[i].l1;
        var l2 = this.state.cards[i].l2;
        var front = this.state.startWithL1 ? l1 : l2;
        var back = this.state.startWithL1 ? l2 : l1;

        var width = (i + 1) / this.state.cards.length * 100;
        var widthStyle = {width: width + "%"};

        var haveControlsChangedClass = this.state.haveControlsChanged ? "bounce" : "";
        return (
            <div id="app-container">
                <div id="settings-panel">
                    <h1>German vocabulary</h1>
                    <p><button className={haveControlsChangedClass} onClick={this.resetCards}>Restart</button></p>
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