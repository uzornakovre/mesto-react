import React from 'react';

function PopupWithForm(props) {
  const [popupState, setPopupState] = React.useState('');
  
  React.useEffect(() => {
    if (props.isOpen) {
      setPopupState('popup_opened');
    } else {
      setPopupState('');
    }
  });

  return (
    <div className={`popup popup_type_${props.name} ${popupState}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button className="popup__close"
                id={`close-${props.name}`}
                type="button"
                onMouseDown={props.onClose}
        >
        </button>
        <form className="popup__form"
              name={props.name}
              id={props.name}
              noValidate
        >
          <h2 className="popup__form-title">{props.title}</h2>
            {props.children}
          <button type="submit" className="popup__form-submit">{props.submitText}</button>
        </form>
      </div>
    </div>  
  )
}

export default PopupWithForm;