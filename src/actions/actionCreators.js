
export const addUserInfo = (user) => {
  return {
    type: 'ADD_USER_INFO',
    user: user
  }
}
export const addProfileInfo = (profile) => {
   return{
     type: 'ADD_PROFILE_INFO',
     profile: profile
   }
 }
export const addSkills = (skills) => {
  return{
    type: 'GET_SKILLS',
    skills: skills
  }
}

export const logout = ()=>{
  return{
    type: 'USER_LOGOUT'
  }
}
