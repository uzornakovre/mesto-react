import React                  from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api                    from '../utils/api';
import Card                   from './Card.js';

function Main(props) {

  const currentUser       = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(`Ошибка при получении данных: ${error}`);
      });
  }, []);

  return (
    <main className="content">
        <section className="profile">
          <div className="profile__avatar-container"
               onClick={props.onEditAvatar}
          >
            <img className="profile__avatar"
                 src={currentUser.avatar}
                 alt="Аватар" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button-edit" 
                    type="button"
                    onClick={props.onEditProfile}
            >
            </button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button className="profile__button-add" 
                  type="button"
                  onClick={props.onAddPlace}
          >
          </button>
        </section>
        <section className="elements" aria-label="Блок с карточками">
          <ul className="elements__list">
            {
              cards.map(card => (
                <Card card={card}
                      key={card._id}
                      onCardClick={props.onCardClick}
                      onDeleteClick={props.onDeleteClick}
                />
              ))
            }
          </ul>
        </section>
      </main>
  )
}

export default Main;