import { React, useState, useEffect } from "react";
import { FlatList } from "react-native";
import { baseUrl } from "../utils/variables";
import ListItem from "./ListItem";

const List = () => {
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
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
