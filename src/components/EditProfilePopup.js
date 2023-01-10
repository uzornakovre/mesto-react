import React                  from 'react';
import PopupWithForm          from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const currentUser                   = React.useContext(CurrentUserContext);
  const nameRef                       = React.useRef();
  const descRef                       = React.useRef();
  const [name,        setName       ] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError,   setNameError  ] = React.useState('');
  const [descError,   setDescError  ] = React.useState('');
  const [isValid,     setIsValid    ] = React.useState(true);
  const [submitText,  setSubmitText ] = React.useState('Сохранить');
 
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser.about, currentUser.name]);

  React.useEffect(() => {
    if (props.isLoading) {
      setSubmitText('Сохранение...');
    } else {
      setSubmitText('Сохранить');
    }
  }, [props.isLoading]);

  React.useEffect(() => {
    if (nameRef.current.value.length === 0) { 
      setNameError('Заполните это поле');
    } else if (nameRef.current.value.length <=  2) {
      setNameError(`Текст должен быть не короче 2 симв. Длина текста сейчас: ${nameRef.current.value.length} символ.`);
    } else {
      setNameError('');
    }
  }, [name]);

  React.useEffect(() => {
    if (descRef.current.value.length === 0) { 
      setDescError('Заполните это поле');
    } else if (descRef.current.value.length <=  2) {
      setDescError(`Текст должен быть не короче 2 симв. Длина текста сейчас: ${descRef.current.value.length} символ.`);
    } else {
      setDescError('');
    }
  }, [description]);

  React.useEffect(() => {
    if (nameError === '' && descError === '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [nameError, descError]);

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
            submitText={submitText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
          >
            <input type="text"
                   className={`popup__form-input popup__form-input_content_name ${nameError !== '' && 'popup__form-input_error'}`}
                   id="name"
                   name="name"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   value={name || ''}
                   ref={nameRef}
                   onChange={handleChangeName}
                   required
            />
            <span className="popup__form-input-error popup__form-input-error_content_name">
              {nameError}
            </span>
            <input type="text"
                   className={`popup__form-input popup__form-input_content_job ${descError !== '' && 'popup__form-input_error'}`}
                   id="job"
                   name="description"
                   placeholder="Профессия"
                   minLength="2"
                   maxLength="200"
                   value={description || ''}
                   ref={descRef}
                   onChange={handleChangeDescription}
                   required
            />
            <span className="popup__form-input-error popup__form-input-error_content_job">
              {descError}
            </span>
          </PopupWithForm>
  )
}

export default EditProfilePopup;