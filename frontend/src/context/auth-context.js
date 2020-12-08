import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    isDoctor: null,
    firstName: null,
    lastName: null,
    login: (userId, isDoctor, token, tokenExpiration, firstName, lastName) => {},
    logout: ()=> {}
});