import { useState, useEffect, useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { appId, baseUrl } from "../utils/variables";

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
  const [loading, setLoading] = useState(false);
  const { update } = useContext(MainContext);
  const loadMedia = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + "tags/" + appId);
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [update]);

  const postMedia = async (formData, token) => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    };
    const result = await doFetch(baseUrl + "media", options);
    result && setLoading(false);
    return result;
  };
  return { mediaArray, postMedia, loading };
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

  const getUserById = async (token, id) => {
    const options = {
      method: "GET",
      headers: { "x-access-token": token },
    };
    return await doFetch(baseUrl + "users/" + id, options);
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
  const checkUsername = async (username) => {
    const result = await doFetch(baseUrl + "users/username/" + username);
    return result.available;
  };

  const modifyUser = async (data, token) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + "users", options);
  };

  return { getUserByToken, postUser, checkUsername, modifyUser, getUserById };
};

const useTag = () => {
  const postTag = async (tagData, token) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(tagData),
    };
    return await doFetch(baseUrl + "tags/", options);
  };
  const getFileByTag = async (tag) => {
    return await doFetch(baseUrl + "tags/" + tag);
  };
  return { postTag, getFileByTag };
};

const useFavorite = () => {
  const getFavoriteByFileId = async (id, token) => {
    const options = {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    };
    return await doFetch(baseUrl + "favourites/file/" + id, options);
  };

  const addFavorite = async (data, token) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ file_id: data }),
    };
    return await doFetch(baseUrl + "favourites/", options);
  };

  const deleteFavorite = async (id, token) => {
    const options = {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    };
    return await doFetch(baseUrl + "favourites/file/" + id, options);
  };

  return { getFavoriteByFileId, addFavorite, deleteFavorite };
};

export { useMedia, useLogin, useUser, useTag, useFavorite };
