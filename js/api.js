import { showErrorMessage, showFetchMessage } from './util.js';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить форму',
};

async function load(route, errorText, method = Method.GET, body = null){
  try{
    const response = await fetch(`${BASE_URL}${route}`, {method, body});
    if (!response.ok) {
      throw new Error();
    }
    if (method === Method.POST) {
      showFetchMessage();
    }
    return await response.json();
  }catch(err) {
    if (method === Method.POST){
      showFetchMessage('Ошибка отправки данных', 'error');
    } else {
      showErrorMessage(errorText);
    }
  }

}

async function getData() {
  return await load(ROUTE.GET_DATA, ErrorText.GET_DATA);
}

async function sendData(body){
  return await load(ROUTE.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);
}

const fetchedData = await getData();

export { fetchedData, sendData, getData };
