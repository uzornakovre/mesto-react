import React         from 'react';
import PopupWithForm from './PopupWithForm';
import urlValidation from '../utils/urlValidation';

function AddPlacePopup(props) {

  const placeNameRef                          = React.useRef();
  const placeLinkRef                          = React.useRef();
  const [placeName,       setPlaceName      ] = React.useState('');
  const [placeLink,       setPlaceLink      ] = React.useState('');
  const [plNameInputInit, setPlNameInputInit] = React.useState(false);
  const [plLinkInputInit, setPlLinkInputInit] = React.useState(false);
  const [placeNameError,  setPlaceNameError ] = React.useState('');
  const [placeLinkError,  setPlaceLinkError ] = React.useState('');
  const [isValid,         setIsValid        ] = React.useState(true);
  const [submitText,      setSubmitText     ] = React.useState('Создать');

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({ 
      placeName: placeNameRef.current.value,
      placeLink: placeLinkRef.current.value 
    });

    placeNameRef.current.value = '';
    placeLinkRef.current.value = '';
  }

  // Обновление стейтов при повторном открытии модального окна

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
    setPlNameInputInit(false);
    setPlLinkInputInit(false);
  }, [props.isOpen])

  // Индикатор загрузки запросов

  React.useEffect(() => {
    if (props.isLoading) {
      setSubmitText('Создание карточки...');
    } else {
      setSubmitText('Создать');
    }
  }, [props.isLoading]);

  // Валидация

  React.useEffect(() => {
    if (placeNameRef.current.value.length === 0) { 
      setPlaceNameError('Заполните это поле');
    } else if (placeNameRef.current.value.length <=  2) {
      setPlaceNameError(`Текст должен быть не короче 2 симв. Длина текста сейчас: ${placeNameRef.current.value.length} символ.`);
    } else {
      setPlaceNameError('');
    }
  }, [placeName]);

  React.useEffect(() => {
    if (placeLinkRef.current.value.length === 0) { 
      setPlaceLinkError('Заполните это поле');
    } else if (urlValidation(placeLinkRef.current.value)) {
      setPlaceLinkError('Введите URL');
    } else {
      setPlaceLinkError('');
    }
  }, [placeLink]);

  React.useEffect(() => {
    if (placeNameError === '' && placeLinkError === '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [placeNameError, placeLinkError]);

  function handleChangePlaceName(evt) {
    setPlaceName(evt.target.value);
    setPlNameInputInit(true);
  }

  function handleChangePlaceLink(evt) {
    setPlaceLink(evt.target.value);
    setPlLinkInputInit(true);
  }

  return (
    <PopupWithForm 
      name={'new-place'}
      title={'Новое место'}
      submitText={submitText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input type="text"
             className={`popup__form-input popup__form-input_content_place ${plNameInputInit && !isValid && 'popup__form-input_error'}`}
             id="place"
             name="input_place-name"
             placeholder="Название"
             minLength="2"
             maxLength="30"
             value={placeName || ''}
             ref={placeNameRef}
             onChange={handleChangePlaceName}
             required
      />
      <span className="popup__form-input-error popup__form-input-error_content_place">
        {plNameInputInit && `${placeNameError}`}
      </span>
      <input type="url" 
             className={`popup__form-input popup__form-input_content_avatar ${plLinkInputInit && !isValid && 'popup__form-input_error'}`}
             id="url"
             name="image-url"
             placeholder="Ссылка на картинку"
             value={placeLink || ''}
             ref={placeLinkRef}
             onChange={handleChangePlaceLink}
             required />
      <span className="popup__form-input-error popup__form-input-error_content_url">
        {plLinkInputInit && `${placeLinkError}`}
      </span>
    </PopupWithForm>  
  )
}

export default AddPlacePopup;