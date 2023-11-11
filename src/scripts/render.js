import {
  handleUpdateModal,
  handleComplete,
  handleDeleteTask,
  handlePending,
} from "./dashboard.js";
import { red } from "./requests.js";
import { toast } from "./toast.js";

export async function render(array = []) {
  const list = document.querySelector(".list__container");
  // const usernameTag = document.querySelector('.account__username')
  // const username = JSON.parse(localStorage.getItem('@doit:username'))

  if (array.message) {
    toast(red, array.message);
    array = [];
  }

  list.innerHTML = "";
  // usernameTag.innerText = username

  array.forEach((task) => {
    const card = createCard(task);

    list.appendChild(card);
  });

  handleUpdateModal();
  handleComplete();
  handlePending();
  handleDeleteTask();
}

function createCard({ id, title, description, created_at, completed }) {
  const cardContainer = document.createElement("li");
  const cardHeaderContainer = document.createElement("header");
  const cardtitle = document.createElement("h2");
  const cardButtonsContainer = document.createElement("div");
  const cardCompleted = document.createElement("img");
  const cardTrash = document.createElement("img");
  const cardUpdate = document.createElement("button");
  const cardDescription = document.createElement("p");
  const cardBar = document.createElement("div");
  const cardDate = document.createElement("p");

  cardContainer.classList.add("card__container");

  cardHeaderContainer.classList.add("card__header");

  cardtitle.classList.add("card__title");
  cardtitle.innerText = title;

  cardButtonsContainer.classList.add("card__buttons--container");

  cardCompleted.src = "../assets/completed-icon.svg";
  cardCompleted.alt = "completed icon";
  cardCompleted.dataset.taskId = id;
  cardCompleted.id = "completeTaskButton";
  cardCompleted.classList.add("card__completed");

  cardTrash.src = "../assets/trash-icon.svg";
  cardTrash.alt = "Trash icon";
  cardTrash.dataset.taskId = id;
  cardTrash.id = "deleteTaskButton";
  cardTrash.classList.add("card__deleted");

  cardUpdate.innerText = "Editar";
  cardUpdate.classList.add("update__button");
  cardUpdate.dataset.taskId = id;

  cardDescription.classList.add("card__description");
  cardDescription.innerText = description;

  cardBar.classList.add("card__bar");
  if (completed) {
    cardBar.classList.add("card__bar--completed");
    cardCompleted.classList.add("card__button--completed");
  } else {
    cardBar.classList.add("card__bar--pending");
  }

  cardDate.classList.add("card__date");
  cardDate.innerText = new Date(created_at).toLocaleDateString();

  cardButtonsContainer.append(cardUpdate, cardCompleted, cardTrash);
  cardHeaderContainer.append(cardtitle, cardButtonsContainer);
  cardContainer.append(cardHeaderContainer, cardDescription, cardBar, cardDate);

  return cardContainer;
}
