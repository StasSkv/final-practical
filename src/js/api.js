import axios from 'axios';
import { LS_KEY } from './refs';

const token = localStorage.getItem(LS_KEY);
axios.defaults.baseURL = 'https://connections-api.goit.global/';
axios.defaults.headers.common.Authorization = `Bearer ${token}`;
