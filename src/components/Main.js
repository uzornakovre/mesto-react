import React from 'react';
import api from '../utils/api';

function Main(props) {

  const [userName,        setUserName       ] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar,      setUserAvatar     ] = React.useState('');
  const [cards,           setCards          ] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((error) => {
        console.log(`Ошибка при получении данных о пользователе: ${error}`);
      });
  });

  React.useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        console.log(cardsData); ///map
        // const initialCards = cardsData;
        // initialCards.forEach(card => {
        //   console.log(card);
          // setCards([...cards,             // return ???? где то тут key
          //   <li className="elements__list-item">
          //     <article className="element">
          //       <img className="element__image" src={card.link} alt="" />
          //       <div className="element__caption">
          //         <h2 className="element__title">{card.name}</h2>
          //         <div className="element__like">
          //           <button className="element__button-like" type="button"></button>
          //           <p className = "element__like-counter"></p>
          //         </div>
          //       </div>
          //     </article>
          //     <button className="elements__button-remove" type="button"></button>
          //   </li>
          // ]);
        // });
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке карточек: ${error}`);
      })
  }, [cards]); //пустой массив для 1 раза загр

  return (
    <main className="content">
        <section className="profile">
          <div className="profile__avatar-container"
               onClick={props.onEditAvatar}
          >
            <img className="profile__avatar" src={userAvatar} alt="Аватар" />
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
            {cards}
            {/* <template id="cardTemplate">
              <li className="elements__list-item">
                <article className="element">
                  <img className="element__image" src="#" alt="" />
                  <div className="element__caption">
                    <h2 className="element__title"></h2>
                    <div className="element__like">
                      <button className="element__button-like" type="button"></button>
                      <p className = "element__like-counter"></p>
                    </div>
                  </div>
                </article>
              <button className="elements__button-remove" type="button"></button></li>
            </template> */}
          </ul>
        </section>
      </main>
  )
}

export default Main;