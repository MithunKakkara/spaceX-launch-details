import axios from 'axios';
import {
  GET_API_DATA,
  GET_API_DATA_LOADING,
  GET_API_DATA_ERROR
} from './constant'

function apiLoading(){
  return{
    type: GET_API_DATA_LOADING
  }
}

function retrieveApiData(response){
  return {
    type: GET_API_DATA,
    data: response.data
  }
}
function retrieveApiError(error){
  return {
    type: GET_API_DATA_ERROR,
    error: error
  }
}
export function fetchApiData(url){
  return dispatch => {
    dispatch(apiLoading())
    return axios.get(url)
      .then(response => dispatch(retrieveApiData(response)))
      .catch(error => {
        return dispatch(retrieveApiError(error))
      });
  }
}
