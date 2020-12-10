import { useState, useEffect } from "react";
import UserService from "../../services/UserService/UserService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

function useUserFetch(userId, dependencies = []) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let allDependencies = [];
  const baseDependencies = [userId, setUser, setIsLoading];

  if (dependencies.legnth === 0) {
    allDependencies = baseDependencies;
  } else {
    allDependencies = baseDependencies.concat(dependencies);
  }

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);

      const newUser = await UserService.getUser(userId);

      if (newUser) {
        setUser(newUser);

        setIsLoading(false);
      } else {
        toast.error("Unable to find user.");

        navigate("/organisation");
      }
    }

    fetchUser();
  }, allDependencies);

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };
}

export default useUserFetch;
