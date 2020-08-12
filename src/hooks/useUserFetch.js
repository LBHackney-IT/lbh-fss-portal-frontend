import { useState, useEffect } from "react";
import UserService from "../services/UserService/UserService";
import { toast } from "react-toastify";
import { navigate } from "@reach/router";

function useUserFetch(userId) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const newUser = await UserService.getUser(userId);

      if (newUser) {
        setUser(newUser);

        setIsLoading(false);
      } else {
        toast.error("Unable to find user.");

        navigate("/users");
      }
    }

    fetchUser();
  }, [userId, setUser, setIsLoading]);

  return {
    user,
    isLoading,
  };
}

export default useUserFetch;
