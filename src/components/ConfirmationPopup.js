import React         from 'react';
import PopupWithForm from './PopupWithForm';

function ComfirmationPopup({ isOpen,
                             onClose,
                             onConfirmDelete,
                             currentCard,
                             isLoading }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmDelete(currentCard);
  }

  return (
    <PopupWithForm 
      name={'delete-card'}
      title={'Вы уверены?'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
      isLoading={isLoading}
    >
    </PopupWithForm>
  )
}

export default ComfirmationPopup;