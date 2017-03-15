import axios from 'axios';

export function getprofile() {
  return axios.get('/api/devProfile')
  .then(res => res.data)
}
