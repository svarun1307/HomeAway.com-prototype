// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        email: action.email,
        trcker : action.trcker,
        firstname : action.firstname,
        lastname : action.lastname,
        'login-type': action['login-type']
      }
    case 'GET_LOGGED_IN_DETAILS':
      return state;
    default:
      return state;
  }
};
