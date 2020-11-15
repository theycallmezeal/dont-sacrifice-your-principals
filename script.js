var app = document.getElementById('app');
var five = 5;
var cards = [
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

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFront: this.props.isFront
        };

        this.flip = this.flip.bind(this);
    }

    flip() {
        this.setState(
            function(state) {
                return {isFront: !state.isFront};
            }
        );
    }

    render() {
        var cardContent = this.state.isFront ? this.props.front : this.props.back;

        return <h1 onClick={this.flip}>{cardContent}</h1>;
    }
}

class FlashcardSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards,
            currentCard: 0
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        this.setState(
            function(state) {
                if (state.currentCard == state.cards.length - 1) {
                    return {};
                }
                return {currentCard: state.currentCard + 1};
            }
        );
    }

    decrement() {
        this.setState(
            function(state) {
                if (state.currentCard == 0) {
                    return {};
                }
                return {currentCard: state.currentCard - 1};
            }
        );
    }

    render() {
        var i = this.state.currentCard;
        return (
            <div>
                <Card isFront={true} front={this.state.cards[i].l1} back={this.state.cards[i].l2}></Card>
                <div>
                    <p><button onClick={this.decrement}>&larr;</button></p>
                    <p>{i + 1} / {this.state.cards.length}</p>
                    <p><button onClick={this.increment}>&rarr;</button></p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <FlashcardSession cards={cards}></FlashcardSession>,
    app
);