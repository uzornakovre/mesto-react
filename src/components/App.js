import React                  from 'react';
import Header                 from './Header.js';
import Main                   from './Main.js';
import Footer                 from './Footer.js';
import PopupWithForm          from './PopupWithForm.js';
import ImagePopup             from './ImagePopup.js';
import EditProfilePopup       from './EditProfilePopup';
import api                    from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen,  setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen,     setAddPlacePopupState   ] = React.useState(false);
  const [isEditAvatarPopupOpen,   setEditAvatarPopupState ] = React.useState(false);
  // const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [selectedCard,            setSelectedCard         ] = React.useState({name: '', link: ''});
  const [currentUser,             setCurrentUser          ] = React.useState({});
  const [cards,                   setCards                ] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(`Ошибка при получении данных: ${error}`);
      });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // function handleDeleteClick() {
  //   setConfirmationPopupOpen(true);
  // }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch((error) => {
          console.log(`Ошибка при удалении карточки: ${error}`);
        })
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    
    if (!isLiked) {
      api.likeCard(card._id, card.owner)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((error) => {
          console.log(`Ошибка при постановке лайка: ${error}`);
        })
    } else {
      api.dislikeCard(card._id, card.owner)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((error) => {
          console.log(`Ошибка при удалении лайка: ${error}`);
        })
    }
}

  function closeAllPopups() {
      setAddPlacePopupState(false);
      setEditProfilePopupState(false);
      setEditAvatarPopupState(false);
      // setConfirmationPopupOpen(false);
      setSelectedCard({name: '', link: ''});
  }

  function handleEscClick(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handlePopupOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content"
          tabIndex="0"
          onKeyDown={handleEscClick}
          onMouseDown={handlePopupOverlayClick}
      >
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeleteClick={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}

        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
        />

        <PopupWithForm 
          name={'new-place'}
          title={'Новое место'}
          submitText={'Создать'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input type="text"
                className="popup__form-input popup__form-input_content_place"
                id="place"
                name="input_place-name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                defaultValue=""
                required
          />
          <span className="popup__form-input-error popup__form-input-error_content_place"></span>
          <input type="url" 
                className="popup__form-input popup__form-input_content_url"
                id="url"
                name="image-url"
                placeholder="Ссылка на картинку"
                defaultValue=""
                required />
          <span className="popup__form-input-error popup__form-input-error_content_url"></span>
        </PopupWithForm>  

        <PopupWithForm 
          name={'avatar'}
          title={'Обновить аватар'}
          submitText={'Сохранить'}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input type="url"
                className="popup__form-input popup__form-input_content_avatar"
                id="avatar"
                name="avatar-url"
                placeholder="Ссылка на аватар"
                defaultValue=""
                required
          />
          <span className="popup__form-input-error popup__form-input-error_content_avatar"></span>  
        </PopupWithForm>

        <PopupWithForm 
          name={'delete-card'}
          title={'Вы уверены?'}
          submitText={'Да'}
          // isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          // onSubmit={handleCardDelete}
        >
          {/* <h2 className="popup__form-title popup__form-title_place_delete-card">Вы уверены?</h2> */}
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
