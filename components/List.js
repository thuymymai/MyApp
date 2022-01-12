import { React } from "react";
import { FlatList } from "react-native";
import { useMedia } from "../hooks/ApiHooks";
import ListItem from "./ListItem";
import PropTypes from "prop-types";

const List = (props) => {
  const { mediaArray } = useMedia();
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({ item }) => (
        <ListItem navigation={props.navigation} singleMedia={item} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default List;
