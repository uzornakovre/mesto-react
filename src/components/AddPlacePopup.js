import React         from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({ 
      placeName: placeNameRef.current.value,
      placeLink: placeLinkRef.current.value 
    })
  }

  return (
    <PopupWithForm 
      name={'new-place'}
      title={'Новое место'}
      submitText={'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="text"
             className="popup__form-input popup__form-input_content_place"
             id="place"
             name="input_place-name"
             placeholder="Название"
             minLength="2"
             maxLength="30"
             defaultValue=""
             ref={placeNameRef}
             required
      />
      <span className="popup__form-input-error popup__form-input-error_content_place"></span>
      <input type="url" 
             className="popup__form-input popup__form-input_content_url"
             id="url"
             name="image-url"
             placeholder="Ссылка на картинку"
             defaultValue=""
             ref={placeLinkRef}
             required />
      <span className="popup__form-input-error popup__form-input-error_content_url"></span>
    </PopupWithForm>  
  )
}

export default AddPlacePopup;