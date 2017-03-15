import axios from 'axios';

export function getCompanyProfile() {
  return axios.get('/api/companyProfile')
  .then(res => res.data)
}