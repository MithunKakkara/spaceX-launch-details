import {
  GET_API_DATA,
  GET_API_DATA_LOADING,
  GET_API_DATA_ERROR
} from './constant'

export const initialState = {
  loading: false,
  data: [],
  error: null
}
function apps( state = initialState, action) {
  switch (action.type) {
    case GET_API_DATA:
      return {
        ...state,
        loading: false,
        data: action.data
      }
    case GET_API_DATA_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_API_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default apps
