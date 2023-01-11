import React         from 'react';
import PopupWithForm from './PopupWithForm';

function ComfirmationPopup(props) {

  const [submitText,  setSubmitText ] = React.useState('Да');

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirmDelete(props.currentCard);
  }

  // Индикатор загрузки запросов

  React.useEffect(() => {
    if (props.isLoading) {
      setSubmitText('Удаление...');
    } else {
      setSubmitText('Да');
    }
  }, [props.isLoading]);

  return (
    <PopupWithForm 
      name={'delete-card'}
      title={'Вы уверены?'}
      submitText={submitText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={true}
    >
    </PopupWithForm>
  )
}

export default ComfirmationPopup;