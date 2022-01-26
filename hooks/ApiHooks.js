import { useState, useEffect } from "react";
import { baseUrl } from "../utils/variables";

const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

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
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(baseUrl + "login", options);
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: "GET",
      headers: { "x-access-token": token },
    };
    return await doFetch(baseUrl + "users/user", options);
  };

  const postUser = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + "users", options);
  };

  return { getUserByToken, postUser };
};

const useTag = () => {
  const postTag = async (data) => {};
  const getFileByTag = async (tag) => {
    return await doFetch(baseUrl + "tags/" + tag);
  };
  return { postTag, getFileByTag };
};

export { useMedia, useLogin, useUser, useTag };
