import axios from 'axios';

export function getCompanyProfile(id) {
  return axios.get(`/api/companyProfile/${id}`)
  .then(res => res.data)
}
