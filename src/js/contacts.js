import { refs } from "./refs";
import { markupContact } from "./markup";
import {
  addContactService,
  deleteContactService,
  getContactService,
  logoutUserService,
} from "./api";

refs.contactForm.addEventListener("submit", onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  const { name, number } = event.currentTarget.elements;
  const contact = {
    name: name.value.trim(),
    number: number.value.trim(),
  };
  const data = await addContactService(contact);
  const markup = markupContact(data);
  refs.contactsList.insertAdjacentHTML("beforeend", markup);
  event.target.reset();
}

async function reloadPage() {
  const data = await getContactService();
  const markup = data.map(markupContact).join("");
  refs.contactsList.innerHTML = markup;
}

const token = localStorage.getItem(refs.LS_KEY);
if (!token) {
  location.replace("/");
} else {
  reloadPage();
}

refs.contactsList.addEventListener("click", deleteContact);

async function deleteContact(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  } else {
    await deleteContactService(event.target.parentNode.id);
    event.target.parentNode.remove();
  }
}

refs.logOut.addEventListener("click", logOut);

async function logOut() {
  await logoutUserService();
  localStorage.removeItem(refs.LS_KEY);
  location.replace("/");
}
