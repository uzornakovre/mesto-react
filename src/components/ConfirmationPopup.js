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
      submitText={'Да'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default ComfirmationPopup;