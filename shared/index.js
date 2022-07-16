import {createContext, useContext, useReducer} from 'react';
import { loginConstants } from './constants';

const Store = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case loginConstants.LOGIN_REQUEST: {
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticating: true
                }
            }
        }
        case loginConstants.LOGIN_SUCCESS: {
            return {
                ...state,
                user: {
                    ...action.payload,
                    authenticated: true,
                    authenticating: false,
                    error: null
                }
            }
        }
        case loginConstants.LOGIN_FAILURE: {
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticating: false,
                    authenticated: false,
                    error: action.payload
                }
            }
        }
        default:
            return state;
    }
}

export const useStore = () => useContext(Store);

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {
        user: {
            authenticated: false,
            authenticating: true,
            error: null
        }
    });

    return (
        <Store.Provider value={[state, dispatch]}>
            {children}
        </Store.Provider>
    )
}