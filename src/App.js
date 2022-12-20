import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div classNameName="App">
      <header className="header">
        <img className="header__logo" src="<%=require('./images/header__logo.svg')%>" alt="Логотип Место" />
      </header>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src="#" alt="Аватар" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name"></h1>
            <button className="profile__button-edit" type="button"></button>
            <p className="profile__job"></p>
          </div>
          <button className="profile__button-add" type="button"></button>
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
      <footer className="footer">
        <p className="footer__copyright">&copy; 2022 Mesto Russia</p>
      </footer>
      <div className="popup popup_type_edit-profile">
        <div className="popup__container popup__container_type_edit-profile">
          <button className="popup__close" id="close-edit" type="button"></button>
          <form className="popup__form" name="profile_edit" id="profile_edit" novalidate>
            <h2 className="popup__form-title">Редактировать профиль</h2>
            <input type="text" className="popup__form-input popup__form-input_content_name" id="name" name="input_name" placeholder="Имя" minlength="2" maxlength="40" required />
            <span className="popup__form-input-error popup__form-input-error_content_name"></span>
            <input type="text" className="popup__form-input popup__form-input_content_job" id="job" name="input_job" placeholder="Профессия" minlength="2" maxlength="200" required />
            <span className="popup__form-input-error popup__form-input-error_content_job"></span>
            <button type="submit" className="popup__form-submit" name="save_profile">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_new-place">
        <div className="popup__container popup__container_type_new-place">
          <button className="popup__close" id="close-place" type="button"></button>
          <form className="popup__form" name="new_place" id="new_place" novalidate>
            <h2 className="popup__form-title">Новое место</h2>
            <input type="text" className="popup__form-input popup__form-input_content_place" id="place" name="input_place-name" placeholder="Название" value="" minlength="2" maxlength="30" required />
            <span className="popup__form-input-error popup__form-input-error_content_place"></span>
            <input type="url" className="popup__form-input popup__form-input_content_url" id="url" name="image-url" placeholder="Ссылка на картинку" value="" required />
            <span className="popup__form-input-error popup__form-input-error_content_url"></span>
            <button type="submit" className="popup__form-submit" name="create_new">Создать</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_avatar">
        <div className="popup__container popup__container_type_avatar">
          <button className="popup__close" id="close-avatar" type="button"></button>
          <form className="popup__form" name="change-avatar" id="avatar_edit" novalidate>
            <h2 className="popup__form-title">Обновить аватар</h2>
            <input type="url" className="popup__form-input popup__form-input_content_avatar" id="avatar" name="avatar-url" placeholder="Ссылка на аватар" value="" required />
            <span className="popup__form-input-error popup__form-input-error_content_avatar"></span>
            <button type="submit" className="popup__form-submit popup__form-submit_place_avatar" name="change_avatar">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_image">
        <div className="popup__container popup__container_type_image">
          <button className="popup__close" id="close-image" type="button"></button>
          <figure className="popup__image-wrapper">
            <img className="popup__image" src="#" alt="" />
            <figcaption className="popup__image-caption"></figcaption>
          </figure>
        </div>
      </div>
      <div className="popup popup_type_delete-card">
        <div className="popup__container popup__container_type_delete-card">
          <button className="popup__close" id="close-delete" type="button"></button>
          <form className="popup__form" name="dalete-card" id="delete-card" novalidate>
            <h2 className="popup__form-title popup__form-title_place_delete-card">Вы уверены?</h2>
            <button type="submit" className="popup__form-submit" name="delete-card" id="confirm-delete">Да</button>
          </form>
        </div>
      </div>  
    </div>
  );
}

export default App;
