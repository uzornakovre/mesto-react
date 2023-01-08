import React         from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  return (
    <PopupWithForm 
            name={'edit-profile'}
            title={'Редактировать профиль'}
            submitText={'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
          >
            <input type="text"
                  className="popup__form-input popup__form-input_content_name"
                  id="name"
                  name="input_name"
                  placeholder="Имя"
                  minLength="2"
                  maxLength="40"
                  defaultValue=""
                  required
            />
            <span className="popup__form-input-error popup__form-input-error_content_name"></span>
            <input type="text"
                  className="popup__form-input popup__form-input_content_job"
                  id="job"
                  name="input_job"
                  placeholder="Профессия"
                  minLength="2"
                  maxLength="200"
                  defaultValue=""
                  required
            />
            <span className="popup__form-input-error popup__form-input-error_content_job"></span>
          </PopupWithForm>
  )
}

export default EditProfilePopup;