import React          from 'react';
import Header         from './Header.js';
import Main           from './Main.js';
import Footer         from './Footer.js';
import PopupWithForm  from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen,    setAddPlacePopupState   ] = React.useState(false);
  const [isEditAvatarPopupOpen,  setEditAvatarPopupState ] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupState(!isEditAvatarPopupOpen);
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupState(!isEditProfilePopupOpen);
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupState(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
      setAddPlacePopupState(false);
      setEditProfilePopupState(false);
      setEditAvatarPopupState(false);
  }

  // function handleEscClick(evt) {
  //   if (evt.key === 'Escape') {
  //     closeAllPopups();
  //   }
  // }

  return (
    <>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />

      <PopupWithForm 
        name={'edit-profile'}
        title={'Редактировать профиль'}
        submitText={'Сохранить'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" className="popup__form-input popup__form-input_content_name" id="name" name="input_name" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="popup__form-input-error popup__form-input-error_content_name"></span>
        <input type="text" className="popup__form-input popup__form-input_content_job" id="job" name="input_job" placeholder="Профессия" minLength="2" maxLength="200" required />
        <span className="popup__form-input-error popup__form-input-error_content_job"></span>
      </PopupWithForm>
      <PopupWithForm 
        name={'new-place'}
        title={'Новое место'}
        submitText={'Создать'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" className="popup__form-input popup__form-input_content_place" id="place" name="input_place-name" placeholder="Название" value="" minLength="2" maxLength="30" required />
        <span className="popup__form-input-error popup__form-input-error_content_place"></span>
        <input type="url" className="popup__form-input popup__form-input_content_url" id="url" name="image-url" placeholder="Ссылка на картинку" value="" required />
        <span className="popup__form-input-error popup__form-input-error_content_url"></span>
      </PopupWithForm>  
      <PopupWithForm 
        name={'avatar'}
        title={'Обновить аватар'}
        submitText={'Сохранить'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input type="url" className="popup__form-input popup__form-input_content_avatar" id="avatar" name="avatar-url" placeholder="Ссылка на аватар" value="" required />
        <span className="popup__form-input-error popup__form-input-error_content_avatar"></span>  
      </PopupWithForm>
      <PopupWithForm 
        name={'delete-card'}
        title={'Вы уверены?'}
        submitText={'Да'}
        onClose={closeAllPopups}
      >
         <h2 className="popup__form-title popup__form-title_place_delete-card">Вы уверены?</h2>
      </PopupWithForm>
      <PopupWithImage />
    </>
  );
}

export default App;
