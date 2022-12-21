import React from 'react';

function Main(props) {
  return (
    <main className="content">
        <section className="profile">
          <div className="profile__avatar-container"
               onClick={props.onEditAvatar}
          >
            <img className="profile__avatar" src="#" alt="Аватар" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">Жак Ив Кусто</h1>
            <button className="profile__button-edit" 
                    type="button"
                    onClick={props.onEditProfile}
            >
            </button>
            <p className="profile__job">Исследователь океана</p>
          </div>
          <button className="profile__button-add" 
                  type="button"
                  onClick={props.onAddPlace}
          >
          </button>
        </section>
        <section className="elements" aria-label="Блок с карточками">
          <ul className="elements__list">
            <template id="cardTemplate">
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
            </template>
          </ul>
        </section>
      </main>
  )
}

export default Main;