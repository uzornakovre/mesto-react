import React from 'react';
import api   from '../utils/api';
import Card  from './Card.js';

function Main(props) {

  const [userName,        setUserName       ] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar,      setUserAvatar     ] = React.useState('');
  const [cards,           setCards          ] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
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
                 src={userAvatar}
                 alt="Аватар" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__button-edit" 
                    type="button"
                    onClick={props.onEditProfile}
            >
            </button>
            <p className="profile__job">{userDescription}</p>
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
                />
              ))
            }
          </ul>
        </section>
      </main>
  )
}

export default Main;