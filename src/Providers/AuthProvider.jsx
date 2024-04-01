import { confirmSignUp, signIn, signUp } from "aws-amplify/auth";
import { createContext, useEffect, useState } from "react";
import { Hub } from 'aws-amplify/utils';

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
          picture: picture
        },
        autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      },
    });
  };

  const handleSignIn = (email, password) => {
    setLoading(true);
    return signIn({ username: email, password });
  }

  const handleConfirmSignUp = (username, confirmationCode) => {
    setLoading(true);
    return confirmSignUp({username, confirmationCode});
  }

  useEffect(() => {
    const unSubscribe = Hub.listen('auth', ({ payload }) => {
        console.log(payload);
        
    })
    return () => unSubscribe();
  }, []);

  const authInfo = { user, loading, handleSignUp, handleSignIn, handleConfirmSignUp };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
