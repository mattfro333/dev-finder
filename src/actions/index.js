import axios from 'axios'

let nextTodoId = 0
export const addUser = (user) => {
  return {
    type: 'ADD_USER',
    id: nextTodoId++,
    user: user
  }
}
