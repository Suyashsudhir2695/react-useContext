import { createContext } from 'react';

const usersContext = createContext({
    users:[],
    addUser: (user) =>{}

});

export default usersContext;