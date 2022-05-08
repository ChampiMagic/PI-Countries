import axios from 'axios';

export function loadingOn() {
  return {
    type: "LOADINGON",

  }
}

export function loadingOff() {
  return {
    type: "LOADINGOFF",

  }

export function set(countries) {
  return {
    type: "SET",
    payload: countries,
  }
}

export function setShowed(countries) {
  return {
    type: "SETSHOWED",
    payload: countries,
  }
}

export function get() {
  return async function(dispatch) {
    dispatch(loadingOn());
    const countries = await axios.get("https://localhost:3001/countries")
    dispatch(set(countries));
    dispatch(setShowed(countries));
    dispatch(loadingOff())
  }
}
