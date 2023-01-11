import React         from 'react';
import PopupWithForm from './PopupWithForm';
import urlValidation from '../utils/urlValidation';

function EditAvatarPopup(props) {

  const avatarRef                     = React.useRef();
  const [avatarLink,  setAvatarLink ] = React.useState(''); // для валидации
  const [avInputInit, setAvInputInit] = React.useState(false);
  const [avatarError, setAvatarError] = React.useState('');
  const [isValid,     setIsValid    ] = React.useState(false);
  const [submitText,  setSubmitText ] = React.useState('Сохранить');

  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  // Обновление стейтов при открытии модального окна

  React.useEffect(() => {
    setAvatarLink('');
    setAvInputInit(false);
  }, [props.isOpen])

  // Индикатор загрузки запросов

  React.useEffect(() => {
    if (props.isLoading) {
      setSubmitText('Сохранение...');
    } else {
      setSubmitText('Сохранить');
    }
  }, [props.isLoading]);

  // Валидация

  React.useEffect(() => {
    if (avatarRef.current.value.length === 0) { 
      setAvatarError('Заполните это поле');
      setIsValid(false);
    } else if (urlValidation(avatarRef.current.value)) {
      setAvatarError('Введите URL');
      setIsValid(false);
    } else {
      setAvatarError('');
      setIsValid(true);
    }
  }, [avatarLink]);

  function handleChangeAvatar(evt) {
    setAvatarLink(evt.target.value);
    setAvInputInit(true);
  }

  return (
    <PopupWithForm 
      name={'avatar'}
      title={'Обновить аватар'}
      submitText={submitText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input type="url"
            className={`popup__form-input popup__form-input_content_avatar ${avInputInit && !isValid && 'popup__form-input_error'}`}
            id="avatar"
            name="avatar-url"
            placeholder="Ссылка на аватар"
            value={avatarLink || ''}
            ref={avatarRef}
            onChange={handleChangeAvatar}
            required
      />
      <span className="popup__form-input-error popup__form-input-error_content_avatar">
        {avInputInit && `${avatarError}`}  
      </span>  
    </PopupWithForm>
  )
}

export default EditAvatarPopup;