import React from 'react';

function ImagePopup(props) {
  const [popupState, setPopupState] = React.useState('');
  
  React.useEffect(() => {
    if (props.card.name != '' && props.card.link != '') {
      setPopupState('popup_opened');
    } else {
      setPopupState('');
    }
  });

  return (
    <div className={`popup popup_type_image ${popupState}`}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__close"
                id="close-image" 
                type="button"
                onMouseDown={props.onClose}
        ></button>
        <figure className="popup__image-wrapper">
          <img className="popup__image" 
               src={props.card.link}
               alt={`Изображение ${props.card.name}`} />
          <figcaption className="popup__image-caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;