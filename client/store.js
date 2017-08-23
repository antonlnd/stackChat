import {createStore} from 'redux';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_STORE'

const gotMessagesFromServer = function(messages) {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages: messages
    }
}



const initialState = { messages: []}

 const store = createStore(reducer);

function reducer(action, state = initialState){
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER: 
           return Object.assign({}, state, { messages: action.messages });
        default: 
           return state;
      }
}
export default {gotMessagesFromServer, store}
