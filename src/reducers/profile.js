function profile(state={profile:[[{}],[{}],[{}]]}, action){
  switch (action.type){
    case 'ADD_PROFILE_INFO':
      console.log('called')
      return{
        profile: action.profile
      }

    default:
      return state
  }

}

export default profile
