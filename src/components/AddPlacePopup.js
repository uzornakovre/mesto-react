import React         from 'react';
import PopupWithForm from './PopupWithForm';
import urlValidation from '../utils/urlValidation';

function AddPlacePopup({ isOpen,
                         onClose,
                         onAddPlace,
                         isLoading }) {

  const placeNameRef                          = React.useRef();
  const placeLinkRef                          = React.useRef();
  const [placeName,       setPlaceName      ] = React.useState('');
  const [placeLink,       setPlaceLink      ] = React.useState('');
  const [plNameInputInit, setPlNameInputInit] = React.useState(false);
  const [plLinkInputInit, setPlLinkInputInit] = React.useState(false);
  const [placeNameError,  setPlaceNameError ] = React.useState('');
  const [placeLinkError,  setPlaceLinkError ] = React.useState('');
  const isValid = placeNameError === '' && placeLinkError === '';

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({ 
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
  }, [isOpen])

  // Валидация

  React.useEffect(() => {
    if (placeNameRef.current.value.length < 1) { 
      setPlaceNameError(placeNameRef.current.validationMessage);
    } else if (placeNameRef.current.value.length <=  2) {
      setPlaceNameError(placeNameRef.current.validationMessage);
    } else {
      setPlaceNameError('');
    }
  }, [placeName]);

  React.useEffect(() => {
    if (placeLinkRef.current.value.length === 0) { 
      setPlaceLinkError(placeLinkRef.current.validationMessage);
    } else if (urlValidation(placeLinkRef.current.value)) {
      setPlaceLinkError(placeLinkRef.current.validationMessage);
    } else {
      setPlaceLinkError('');
    }
  }, [placeLink]);

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
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <input type="text"
             className={`popup__form-input popup__form-input_content_place ${plNameInputInit && placeNameError !== '' && 'popup__form-input_error'}`}
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
             className={`popup__form-input popup__form-input_content_avatar ${plLinkInputInit && placeLinkError !== '' && 'popup__form-input_error'}`}
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