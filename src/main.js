import "./js/register.js";
import "./js/login.js";
import { refs } from "./js/refs.js";

const token = localStorage.getItem(refs.LS_KEY);
if (token) {
  location.replace("/contacts.html");
} 
