import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    isDoctor: null,
    firstName: null,
    lastName: null,
    login: (firstName, lastName, userId, isDoctor, token, tokenExpiration) => {},
    logout: ()=> {}
});