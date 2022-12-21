import React from 'react';

function PopupWithImage() {
  return (
    <div className="popup popup_type_image">
      <div className="popup__container popup__container_type_image">
        <button className="popup__close" id="close-image" type="button"></button>
        <figure className="popup__image-wrapper">
          <img className="popup__image" src="#" alt="" />
          <figcaption className="popup__image-caption"></figcaption>
        </figure>
      </div>
    </div>
  )
}

export default PopupWithImage;