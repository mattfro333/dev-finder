import axios from 'axios';

export function getjob(id) {
  return axios.get(`/api/job/${id}`)
  .then(res => res.data)
}
