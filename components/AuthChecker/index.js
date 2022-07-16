import { getSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useStore } from "../../shared";
import { loginConstants } from "../../shared/constants";
import { getValue } from "../../utils/common";

const AuthChecker = ({ children }) => {
  const [state, dispatch] = useStore();
  useEffect(() => {
    (async () => {
      const authenticated = getValue(state, ["user", "authenticated"], false);
      if (!authenticated) {
        dispatch({ type: loginConstants.LOGIN_REQUEST });
        const session = await getSession();
        if (session) {
          dispatch({
            type: loginConstants.LOGIN_SUCCESS,
            payload: session,
          });
        } else {
          dispatch({
            type: loginConstants.LOGIN_FAILURE,
            payload: session,
          });
        }
      }
    })();
  }, []);
  return <>{children}</>;
};

export default AuthChecker;
