import React, { useContext } from "react";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";
import {
  Avatar,
  ListItem as RNEListItem,
  ButtonGroup,
} from "react-native-elements";
import { Alert } from "react-native";
import { useMedia } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainContext } from "../contexts/MainContext";

const ListItem = ({ navigation, singleMedia, myFilesOnly }) => {
  const { deleteMedia } = useMedia();
  const { update, setUpdate } = useContext(MainContext);
  const doDelete = async (id) => {
    Alert.alert("Delete", "this file permanently?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("userToken");
            const response = await deleteMedia(id, token);
            response && setUpdate(update + 1);
            console.log("delete", response);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };
  return (
    <RNEListItem
      onPress={() => {
        navigation.navigate("Single", { item: singleMedia });
      }}
    >
      <Avatar
        size="large"
        source={{ uri: uploadsUrl + singleMedia.thumbnails.w160 }}
      ></Avatar>
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
        {myFilesOnly && (
          <ButtonGroup
            onPress={(index) => {
              if (index === 0) {
                navigation.navigate("Modify", { file: singleMedia });
              } else {
                doDelete(singleMedia.file_id);
              }
            }}
            buttons={["Modify", "Delete"]}
            rounded
          />
        )}
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  singleMedia: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default ListItem;
