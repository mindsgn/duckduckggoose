import axios  from 'axios';
import { UPDATE_LED, UPDATE_COLOR, STATE } from './constant';
import { io } from 'socket.io-client';

let name = null;
let address = null;
let time = null;
let date = null;
let data = {};

const socket = io('http://banner.local');

// login user
export const update = (text, color) => (dispatch) => {
  try{
    axios.post('http://banner.local:5000/update', {
      params: {
        text: text,
        color: color,
      }
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error){
      console.log('post reducer error', error)
    })
  }catch(error){
    console.log('post reducer error', error)
  }
};

export const on = () => (dispatch) => {
  try{
    axios.post('http://banner.local:5000/on', {
      params: {}
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error){
      console.log('post reducer error', error)
    })
  }catch(error){
    console.log('post reducer error', error)
  }
};

export const off = () => (dispatch) => {
  try{
    axios.post('http://banner.local:5000/off', {
      params: {}
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error){
      console.log('post reducer error', error)
    })
  }catch(error){
    console.log('post reducer error', error)
  }
};

//dispatchers
export const setUpdate = (data) => {
  return {
    type: UPDATE_LED,
    payload: data,
  };
};

export const updateColor = (data) => {
  return {
    type: UPDATE_COLOR,
    payload: data,
  };
};

export const updateState = (data) => {
  return {
    type: STATE,
    payload: data,
  };
};
