const defaultState = {
  loading: false,
  ternary: true,
  countries: [],
  activities: [],
  showedCountries: [],
  currentPage: 1,
}

export default function rootReducer(state = defaultState, action)  {
  switch (action.type) {
    case "LOADINGON":
      return {
        ...state,
        loading: true
      }
    case "LOADINGOFF":
      return {
        ...state,
        loading: false
      }
    case "SETPAGE":
      return {
        ...state,
        currentPage: action.payload 
      }
    case "CHANGETERNARY":
      return {
        ...state,
        ternary: action.payload
      }
    case "SETCOUNTRIES":
      return {
        ...state,
        countries: action.payload
      }
    case "SETACTIVITIES":
      return {
        ...state,
        activities: action.payload
      }
    case "SETSHOWED":
      return {
        ...state,
        showedCountries: action.payload
      }

    default:
      return {...state}

  }
}
