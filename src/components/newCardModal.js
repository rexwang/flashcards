import CardModal from './cardModal';
import { connect } from 'react-redux';
import { addCard } from '../actions';

const mapStateToProps = (props, { params: { deckId } }) => ({
  card: { deckId }
});

const mapDispatchToProps = dispatch => ({
  onSave: card => dispatch(addCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
