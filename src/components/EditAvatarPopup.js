import React         from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const [submitText,  setSubmitText ] = React.useState('Сохранить');

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })

    avatarRef.current.value = '';
  }

  React.useEffect(() => {
    if (props.isLoading) {
      setSubmitText('Сохранение...');
    } else {
      setSubmitText('Сохранить');
    }
  }, [props.isLoading]);

  return (
    <PopupWithForm 
      name={'avatar'}
      title={'Обновить аватар'}
      submitText={submitText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="url"
            className="popup__form-input popup__form-input_content_avatar"
            id="avatar"
            name="avatar-url"
            placeholder="Ссылка на аватар"
            defaultValue=""
            ref={avatarRef}
            required
      />
      <span className="popup__form-input-error popup__form-input-error_content_avatar"></span>  
    </PopupWithForm>
  )
}

export default EditAvatarPopup;