import React from 'react';

function PopupWithForm({ name,
                         title,
                         isOpen,
                         onClose,
                         onSubmit,
                         isValid,
                         isLoading,
                         onOverlayClick,
                         children }) {
  const [popupState, setPopupState] = React.useState('');
  
  React.useEffect(() => {
    if (isOpen) {
      setPopupState('popup_opened');
    } else {
      setPopupState('');
    }
  }, [isOpen]);

  return (
    <div className={`popup popup_type_${name} ${popupState}`}
         onMouseDown={onOverlayClick}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close"
                id={`close-${name}`}
                type="button"
                onMouseDown={onClose}
        >
        </button>
        <form className="popup__form"
              name={name}
              id={name}
              onSubmit={onSubmit}
              noValidate
        >
          <h2 className={`popup__form-title popup__form-title_place_${name}`}>{title}</h2>
            {children}
          <button type="submit"
                  className={`popup__form-submit ${!isValid && 'popup__form-submit_disabled'}`}
                  disabled={!isValid}
          >
            {name === 'edit-profile' && (isLoading ? 'Сохранение...'        : 'Сохранить')}
            {name === 'new-place'    && (isLoading ? 'Создание карточки...' : 'Создать'  )}
            {name === 'avatar'       && (isLoading ? 'Сохранение...'        : 'Сохранить')}
            {name === 'delete-card'  && (isLoading ? 'Удаление карточки...' : 'Да'       )}
          </button>
        </form>
      </div>
    </div>  
  )
}

export default PopupWithForm;