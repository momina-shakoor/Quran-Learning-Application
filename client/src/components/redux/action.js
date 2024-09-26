// redux/actions.js

export const loginUser = (userData) => {
  console.log('User data to be stored in local storage:', userData); 
  return {
    type: 'LOGIN_USER',
    payload: userData,
  };
};
  export const updateduser=(userData)=>{
    return{
      type:'UPDATE_USER',
      payload:userData
    };
  };
  export const logoutUser = () => ({
    type: 'LOGOUT_USER',
  });
  
