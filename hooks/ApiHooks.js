import { useState, useEffect } from "react";
import { baseUrl } from "../utils/variables";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + "media/");
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + "media/" + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );
      setMediaArray(media);
      console.log(mediaArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);
  return { mediaArray };
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      const response = await fetch(baseUrl + "login", options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw Error(userData.message + ": " + userData.error);
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const options = {
        method: "GET",
        headers: { "x-access-token": token },
      };
      const response = await fetch(baseUrl + "users/user", options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw Error(userData.message);
      }
    } catch (error) {
      throw Error(error.message);
    }
  };
  const postUser = async (userCredentials) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      const response = await fetch(baseUrl + "users", options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw Error(userData.message + ": " + userData.error);
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

  return { getUserByToken, postUser };
};

export { useMedia, useLogin, useUser };
