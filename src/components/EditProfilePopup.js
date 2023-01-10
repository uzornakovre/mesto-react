import React                  from 'react';
import PopupWithForm          from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  
  const currentUser = React.useContext(CurrentUserContext);

  const [name,        setName       ] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm 
            name={'edit-profile'}
            title={'Редактировать профиль'}
            submitText={'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
          >
            <input type="text"
                   className="popup__form-input popup__form-input_content_name"
                   id="name"
                   name="input_name"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   defaultValue={name}
                   onChange={handleChangeName}
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
                   defaultValue={description}
                   onChange={handleChangeDescription}
                   required
            />
            <span className="popup__form-input-error popup__form-input-error_content_job"></span>
          </PopupWithForm>
  )
}

export default EditProfilePopup;