import axios from 'axios';

const storeUser = (user) => {
  return {
    type: 'STORE_USER',
    user
  }
}

const userExist= (user) => {
  return {
    type: 'USER_EXIST',
    user
  }
}

const userLoginSuccessfully=(user)=>{
  return {
    type: 'USER_LOGIN_SUCCESS',
    user
  }
}

const userAuthError = (error) =>{
  return{
    type:'USER_AUTH_ERROR',
    error
  }
}

export const getUser = () => {
  return (dispatch) => {
    axios.get('/auth/user')
      .then( (response) => {
        const user = response.data;
        dispatch(storeUser(user));
      })
      .catch((error)=> {
        console.error("AJAX: Could not get user @ '/auth/user'")
      });
  };
}

export const localLogin = (user, history) => {
  return (dispatch) => {
    axios.post('/auth/login', user)
      .then( (response) => {
        const data = response.data;
        dispatch(userLoginSuccessfully(data))
        dispatch(storeUser(data));
        history.push('/dashboard');
      })
      .catch((error)=> {
        console.error("AJAX: Could not get user @ '/auth/user'")
      });
  };
}



export const localSignup = (user) => {
  return(dispatch) => {
    axios.post('/auth/signup', user)
    .then((response) => {
      const data = response.data;
      if(data.error){
        console.log(data.message);
      //Notification if needed
      }else {
        console.error("AXIOS CALL:LOCAL SIGNUP '/auth/user'");
      }
    })
    .catch((error) => {
      console.error("AXIOS CALL ERROR: LOCAL SIGN UP/auth/signup'");
      console.log('error: '+ error.message)
    });
  }
}



export const localLogout = () => {
  return (dispatch) => {
    axios.get('/auth/logout')
      .then( (response) => {
        const data = response.data;
        // RETURN USER FROM PASSPORT
        dispatch(getUser());
        if(data.error){
          console.log(data.message)
          //Notification if needed
        }else{
          console.error("AXIOS CALL: LOGGED OUT /auth/logout");
        }
      })
      .catch((error)=> {
        console.error("AXIOS CALL: CANNOT LOGOUT /auth/logout ");
      });
    }
}
