import {createStore} from 'redux';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_STORE'

const gotMessagesFromServer = function(messages) {
    return {
        type: 'GOT_MESSAGES_FROM_SERVER',
        messages: messages
    }
}



const initialState = { messages: [] }

 const store = createStore(reducer);

function reducer(state = initialState, action){
    console.log(action)
    switch (action.type) {
        case (action.type ==='GOT_MESSAGES_FROM_SERVER'): 
           return Object.assign({}, state, { messages: action.messages });
        default: 
           return state;
      }
}
export {gotMessagesFromServer, store}
