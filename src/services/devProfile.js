import axios from 'axios';

export function getprofile(id) {
  return axios.get(`/api/devProfile/${id}`)
  .then(res => res.data)
}
