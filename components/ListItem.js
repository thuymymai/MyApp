import React from "react";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";
import { Avatar, ListItem as RNEListItem } from "react-native-elements";

const ListItem = (props) => {
  return (
    <RNEListItem
      onPress={() => {
        props.navigation.navigate("Single", { item: props.singleMedia });
      }}
    >
      <Avatar
        size="large"
        source={{ uri: uploadsUrl + props.singleMedia.thumbnails.w160 }}
      ></Avatar>
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {props.singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {props.singleMedia.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
