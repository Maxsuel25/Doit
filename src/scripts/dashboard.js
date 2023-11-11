import { render } from "./render.js";
import {
  completeTask,
  createTask,
  deleteTaskById,
  readAllTasks,
  readTaskById,
  red,
  uncompleteTask,
  updateTaskById,
} from "./requests.js";
import { toast } from "./toast.js";

const authentication = () => {
  const token = localStorage.getItem("@doIt:token");

  if (!token) {
    location.replace("../../");
  }
};

const showDash = async () => {
  const tasks = await readAllTasks();

  render(tasks);
};

const showAddTaskModal = () => {
  const button = document.querySelector("#addTaskButton");
  const modalController = document.querySelector(".modal__controller--task");

  button.addEventListener("click", () => {
    modalController.showModal();
  });
};

const closeModal = () => {
  const button = document.querySelector("#closeModalButton");
  const modalController = document.querySelector(".modal__controller--task");

  button.addEventListener("click", () => {
    modalController.close();
  });
};

const handleNewTask = () => {
  const inputs = document.querySelectorAll(".create__task");
  const button = document.querySelector("#addTaskSubmit");
  const modalController = document.querySelector(".modal__controller--task");

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const newTask = {};
    let count = 0;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      newTask[input.name] = input.value;
    });

    if (count !== 0) {
      return toast("Por favor, preencha todos os campos necessários!", red);
    } else {
      await createTask(newTask);
      modalController.close();

      showDash();

      inputs.forEach((input) => (input.value = ""));
    }
  });
};

export const handleUpdateModal = async (taskId) => {
  const modalController = document.querySelector(".modal__controller--update");
  const updateButtons = document.querySelectorAll(".update__button");
  const submitButton = document.querySelector("#taskSubmitUpdate");

  updateButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      submitButton.dataset.taskId = event.target.dataset.taskId;
      modalController.showModal();
    });
  });
};

const handleUpdateEvent = () => {
  const modalController = document.querySelector(".modal__controller--update");
  const inputs = document.querySelectorAll(".task_modal__update > .add__input");
  const submitButton = document.querySelector("#taskSubmitUpdate");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const updateTask = {};
    let count = 0;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      updateTask[input.name] = input.value;
    });

    if (count !== 0) {
      return toast("Por favor, preencha todos os campos necessários!", red);
    } else {
      await updateTaskById(event.target.dataset.taskId, updateTask);

      modalController.close();

      showDash();

      inputs.forEach((input) => (input.value = ""));
    }
  });
};

export const handleDeleteTask = () => {
  const deleteButtons = document.querySelectorAll(".card__deleted");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      await deleteTaskById(event.target.dataset.taskId);

      showDash();
    });
  });
};

export const handleComplete = () => {
  const completeButtons = document.querySelectorAll(".card__completed");
  const cardBar = document.querySelector(".card__bar");

  completeButtons.forEach((button) => {
    if (!button.classList.contains("card__button--completed")) {
      button.addEventListener("click", async (event) => {
        const complete = await completeTask(event.target.dataset.taskId);
        if (complete) {
          cardBar.classList.add("card__bar--completed");
          cardBar.classList.remove("card__bar--pending");
        }

        showDash();
      });
    }
  });
};

export const handlePending = () => {
  const completeButtons = document.querySelectorAll(".card__completed");
  const cardBar = document.querySelector(".card__bar");

  completeButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const pending = await uncompleteTask(event.target.dataset.taskId);
      if (pending) {
        cardBar.classList.add("card__bar--pending");
        cardBar.classList.remove("card__bar--completed");
      }

      showDash();
    });
  });
};

const showLogoutOptions = () => {
  const button = document.querySelector(".header__action");
  const background = document.querySelector(".header__account--after");
  const logoutOption = document.querySelector(".header__account");
  const logoutName = document.querySelector(".account__username");

  button.addEventListener("click", () => {
    background.classList.toggle("hidden");
    logoutOption.classList.toggle("hidden");
    logoutName.innerText = `@${localStorage.getItem("@doIt:name")}`;
    const buttonLogout = document.querySelector(".button__container");

    buttonLogout.addEventListener("click", () => {
      localStorage.clear();
      location.replace("../../");
    });
  });
};

authentication();
await showDash();
showAddTaskModal();
handleNewTask();
closeModal();
handleUpdateEvent();
showLogoutOptions();
