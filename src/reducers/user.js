function users(state={}, action){
  switch (action.type){
    case 'ADD_USER_INFO':
      return{
        user: action.user
      }
    case 'ADD_PROFILE_INFO':
      console.log('called')
      return{
        profile: action.profile
      }

    default:
      return state
  }

}

export default users
