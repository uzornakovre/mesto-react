import React         from 'react';
import PopupWithForm from './PopupWithForm';
import urlValidation from '../utils/urlValidation';

function EditAvatarPopup({ isOpen,
                           onClose,
                           onUpdateAvatar,
                           isLoading }) {

  const avatarRef                     = React.useRef();
  const [avatarLink,  setAvatarLink ] = React.useState(''); // для валидации
  const [avInputInit, setAvInputInit] = React.useState(false);
  const [avatarError, setAvatarError] = React.useState('');
  const isValid                       = avatarError === '';


  // Отправка формы

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  // Обновление стейтов при повторном открытии модального окна

  React.useEffect(() => {
    setAvatarLink('');
    setAvInputInit(false);
  }, [isOpen])

  // Валидация

  React.useEffect(() => {
    if (avatarRef.current.value.length === 0) { 
      setAvatarError(`Заполните это поле`);
    } else if (urlValidation(avatarRef.current.value)) {
      setAvatarError(`Введите URL`);
    } else {
      setAvatarError('');
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
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
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