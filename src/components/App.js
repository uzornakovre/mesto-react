import React                  from 'react';
import Header                 from './Header';
import Main                   from './Main';
import Footer                 from './Footer';
import AddPlacePopup          from './AddPlacePopup';
import ImagePopup             from './ImagePopup';
import EditProfilePopup       from './EditProfilePopup';
import EditAvatarPopup        from './EditAvatarPopup';
import ConfirmationPopup      from './ConfirmationPopup';
import api                    from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen,  setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen,     setAddPlacePopupState   ] = React.useState(false);
  const [isEditAvatarPopupOpen,   setEditAvatarPopupState ] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [preparedForRemove,       setPreparedForRemove    ] = React.useState({});
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

  function handleUpdateUser(userData) {
    api.changeUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при изменении данных о пользователе: ${error}`);
      })
  }

  function handleUpdateAvatar(userData) {
    api.changeUserAvatar(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при изменении аватара: ${error}`);
      })
  }

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

  function handleDeleteClick(card) {
    setConfirmationPopupOpen(true);
    setPreparedForRemove(card);
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
          closeAllPopups();
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

  function handleAddPlaceSubmit(cardData) {
    api.createCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при создании новой карточки: ${error}`);
      })
  }

  function closeAllPopups() {
      setAddPlacePopupState(false);
      setEditProfilePopupState(false);
      setEditAvatarPopupState(false);
      setConfirmationPopupOpen(false);
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
          onDeleteClick={handleDeleteClick}
          onCardLike={handleCardLike}
          cards={cards}

        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmationPopup isOpen={isConfirmationPopupOpen}
                           onClose={closeAllPopups}
                           onConfirmDelete={handleCardDelete}
                           currentCard={preparedForRemove}
        />

        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
