const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  user: initialUser,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      console.log('reducer',action.payload)
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        
      };
    case 'LOGOUT_USER':
      localStorage.removeItem('user');
     
      return {
        ...state,
        user: null,
      }
      
     
     
    default:
      return state;
  }
};

export default authReducer;
