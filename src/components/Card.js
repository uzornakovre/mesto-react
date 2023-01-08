import React                  from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser             = React.useContext(CurrentUserContext);
  const isOwn                   = props.card.owner._id === currentUser._id;
  const isLiked                 = props.card.likes.some(like => like._id === currentUser._id);
  
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.card);
  }

  return (
    <li className="elements__list-item">
      <article className="element">
        <img className="element__image" 
              src={props.card.link}
              alt={`Изображение ${props.name}`}
              onClick={handleClick}
        />
        <div className="element__caption">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like">
            <button className={`element__button-like ${isLiked && 'element__button-like_active'}`}
                    type="button"
                    onClick={handleLikeClick}
            ></button>
            <p className = "element__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </article>
      {isOwn && <button className="elements__button-remove elements__button-remove_active"
                        type="button"
                        onClick={handleDeleteClick}></button>}
    </li>
  )
}

export default Card;