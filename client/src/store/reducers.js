const defaultState = {
  loading: false,
  ternary: true,
  countries: [],
  showedCountries: [],
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
    case "SET":
      return {
        ...state,
        countries: action.payload
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
