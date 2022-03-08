import { useState, useEffect } from "react";
import "./App.css";
import cardImages from "./card-images";
import MagicCard from "./components/MagicCard";

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [deckSize, setDeckSize] = useState(10);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .slice(0,(deckSize*2))
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurn(turn);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceTwo(null)
    setChoiceOne(null)
    setDisabled(false)
    setTurn((prev) => prev + 1)
  };

  useEffect(() => {
    shuffleCards();
  }, [])

  useEffect(() => {
    if (!!choiceOne && !!choiceTwo) {
      setDisabled(true)
      const isMatch =
        choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id;
      if (isMatch) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          );
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  return (
    <div className="App">
      <section className="title">
        <h1>Magic Cards</h1>
        <input type="number" value={deckSize}/>
        <button onClick={shuffleCards}>New Game</button>
      </section>
      <section className="cards-grid">
        {cards.map((card) => (
          <MagicCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
