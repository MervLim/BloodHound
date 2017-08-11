const initialState = {
  isLoggedIn:false,
  usernameExists:false,
  user:{}
}

const User = (state = initialState, action) => {
  switch (action.type) {

    case 'STORE_USER':
      return {
        ...state,
        user: action.user,
      }
      break;

    case 'LOGOUT_USER':
      return {
        ...state,
        user: {}
      }
      break;

      case 'USER_LOGIN_SUCCESS':
       return {
         ...state,
         isLoggedIn: true,
         user: action.user
       }
    default:
    return state
  }
}


export default User;
//user:action.user
