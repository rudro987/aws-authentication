/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser, signIn, signOut, signUp } from "aws-amplify/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = (username, password, name, picture) => {
    setLoading(true);
    return signUp({
      username: username,
      password: password,
      options: {
        userAttributes: {
          name: name,
          picture: picture
        }
      }
    });
  };

  const logInUser = (username, password) => {
    setLoading(true);
    return signIn({
      username: username,
      password: password
    });
  };

  const logOutUser = () => {
    setLoading(true);
    setUser(null);
    return signOut();
  };

  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", async (data) => {
      setUser(await getCurrentUser());
      switch (data.payload.event) {
        case "signedIn":
          getUser();
          setLoading(false);
          break;
        case "signOut":
          setLoading(false);
          break;
        default:
          break;
      }
    });

    getUser();
    return () => hubListenerCancel();
  }, []);

  const getUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

  console.log(user);

  const authInfo = { user, loading, createNewUser, logInUser, logOutUser };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
