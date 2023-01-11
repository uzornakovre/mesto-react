import React         from 'react';
import PopupWithForm from './PopupWithForm';

function ComfirmationPopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirmDelete(props.currentCard);
  }

  return (
    <PopupWithForm 
      name={'delete-card'}
      title={'Вы уверены?'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={true}
      isLoading={props.isLoading}
    >
    </PopupWithForm>
  )
}

export default ComfirmationPopup;