import { confirmSignUp, signIn, signOut, signUp } from "aws-amplify/auth";
import { createContext, useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignUp = (firstName, lastName, email, password, picture) => {
    setLoading(true);
    return signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email: email,
          given_name: firstName,
          family_name: lastName,
          picture: picture,
        },
        autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      },
    });
  };

  const handleSignIn = (email, password) => {
    setLoading(true);
    return signIn({ username: email, password });
  };

  const handleConfirmSignUp = (username, confirmationCode) => {
    setLoading(true);
    return confirmSignUp({ username, confirmationCode });
  };

  const handleSignOut = () => {
    setLoading(true);
    localStorage.removeItem("userData");
    return signOut();
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      setLoading(false);
    }

    const hubListenerCancelToken = Hub.listen("auth", ({ payload }) => {
      console.log(payload);
      switch (payload.event) {
        case "signedIn":
          localStorage.setItem("userData", JSON.stringify(payload.data));
          setUser(payload.data);
          setLoading(false);
          break;
        case "signedOut":
          localStorage.removeItem("userData");
          setUser(null);
          setLoading(false);
          break;
        default:
          break;
      }
    });
    hubListenerCancelToken();
  }, []);

  console.log(user);

  const authInfo = {
    user,
    loading,
    handleSignUp,
    handleSignIn,
    handleConfirmSignUp,
    handleSignOut,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
