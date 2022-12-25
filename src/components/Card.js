import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
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
            <button className="element__button-like"
                    type="button"></button>
            <p className = "element__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
      </article>
      <button className="elements__button-remove"
              type="button"></button>
    </li>
  )
}

export default Card;