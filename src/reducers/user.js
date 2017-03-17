function user(state={user: {}}, action){
  switch (action.type){
    case 'ADD_USER_INFO':
      return{
        user: action.user
      }

    default:
      return state
  }

}

export default user
