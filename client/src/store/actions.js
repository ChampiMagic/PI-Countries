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
  }

  export function changeTernary(boolean) {
    return {
      type: "CHANGETERNARY",
      payload: boolean,

      }
    }

  export function setCurrentPage(number) {
    return {
      type: "SETPAGE",
      payload: number,

    }
  }

export function setCountries(countries) {
  return {
    type: "SETCOUNTRIES",
    payload: countries,
  }
}

export function setActivities(activities) {
  return {
    type: "SETACTIVITIES",
    payload: activities,
  }
}

export function setShowed(countries) {
  return {
    type: "SETSHOWED",
    payload: countries,
  }
}

export function getCountries() {
  return async function(dispatch) {
    dispatch(loadingOn());
    const countries = await axios.get("http://localhost:3001/countries")
    dispatch(setCountries(countries.data));
    dispatch(setShowed(countries.data));
    dispatch(loadingOff())
  }
}

export function getActivities() {
  return async function(dispatch) {
    const activities = await axios.get("http://localhost:3001/activities")
    dispatch(setActivities(activities.data));
  }
}
