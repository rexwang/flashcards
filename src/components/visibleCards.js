import React from 'react';
import Card from './card';
import { connect } from 'react-redux';
import fuzzySearch from 'fuzzySearch';

const matches = (filter, card) =>
  fuzzySearch(filter, card.front) ||
  fuzzySearch(filter, card.back);

const mapStateToProps = ({cards, cardFilter}, {params: {deckId}}) => ({
  cards: cards.filter(c => c.deckId === deckId && matches(cardFilter, c))
});

const Cards = ({ cards, children }) => {
  return (
    <div className="main">
      {cards.map(card => <Card card={card} key={card.id} />)}
      {children}
    </div>
  );
};

export default connect(mapStateToProps)(Cards);
