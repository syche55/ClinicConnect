import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    isDoctor: null,
    login: (userId, isDoctor, token, tokenExpiration) => {},
    logout: ()=> {}
});