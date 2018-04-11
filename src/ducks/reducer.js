import axios from "axios";

// initialize state

const initialState = {
    user: {}
};

////////  the reason i make these strings into const variables is to take advantage of auto-complete
const UPDATE_USER_INFO = "UPDATE_USER_INFO";

//action creators//

export function getUserInfo() {
    const userData = axios.get("/auth/me").then(res => {
        return res.data;
    });
    return {
        type: UPDATE_USER_INFO,
        payload: userData
    };
}

//reducer function

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_INFO + "_FULFILLED":
            return Object.assign({}, state, { user: action.payload });

        default:
            return state;
    }
}