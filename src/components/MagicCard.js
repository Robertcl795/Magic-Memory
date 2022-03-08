import React from "react";
import "./MagicCard.css";

const MagicCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if(!disabled) {
      handleChoice(card);
    }
  };
  return (
    <article className="card-item" key={card.id}>
      <section className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt={card.alt} />
        <img
          className="back"
          src="/img/cover.svg"
          alt={card.alt}
          onClick={handleClick}
        />
      </section>
    </article>
  );
};

export default MagicCard;
