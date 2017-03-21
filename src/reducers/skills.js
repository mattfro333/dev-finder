import axios from 'axios'

function profile(state={}, action){

  switch (action.type){
    case 'GET_SKILLS':
      return{
        skills:action.skills
    }
    default:
      return state
  }


}

export default profile
