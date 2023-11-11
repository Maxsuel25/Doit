import { loginRequest, red } from "./requests.js";
import { toast } from "./toast.js";

const authentication = () => {
  const token = localStorage.getItem("@doIt:token");

  if (token) {
    location.replace("./src/pages/dashboard.html");
  }
};

const handleLogin = () => {
  const inputs = document.querySelectorAll(".login__input");
  const button = document.querySelector(".login__button");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    let count = 0;

    const requestBody = {};

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      } else {
        requestBody[input.name] = input.value.trim();
      }
    });

    if (count === 0) {
      loginRequest(requestBody);
    } else {
      toast("Por favor, preencha todos os campos!", red);
    }
  });
};

authentication();
handleLogin();
