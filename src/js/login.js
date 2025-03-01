import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import { loginUserService } from "./api";
import { refs } from "./refs";

const modal = basicLightbox.create(document.querySelector("#login"));

refs.logIn.addEventListener("click", openLoginModal);

function openLoginModal() {
  modal.show();
  const loginForm = document.querySelector(".login-form");
  loginForm.addEventListener("submit", onSubmit);
}

async function onSubmit(event) {
  event.preventDefault();
  const { email, password } = event.currentTarget.elements;
  const user = {
    email: email.value.trim(),
    password: password.value.trim(),
  };
  const data = await loginUserService(user);
  localStorage.setItem(refs.LS_KEY, data.token);
  event.target.reset();
  location.replace("/contacts.html");
}
