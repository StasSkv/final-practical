import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import { registerUserService } from "./api";
import { refs } from "./refs";

const modal = basicLightbox.create(document.querySelector("#register"));

refs.signUp.addEventListener("click", openModal);

function openModal() {
  modal.show();
  const registerForm = document.querySelector(".register-form");
  registerForm.addEventListener("submit", onSubmit);
}

async function onSubmit(event) {
  event.preventDefault();
  const { name, email, password } = event.currentTarget.elements;
  const user = {
    name: name.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };
  const data = await registerUserService(user);
  localStorage.setItem(refs.LS_KEY, data.token);
  event.target.reset();
  location.replace("/contacts.html");
}
