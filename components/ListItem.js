import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import PropTypes from "prop-types";

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.flexbox}>
      <Image
        style={{ margin: 10, width: "50%", height: 300 }}
        source={{ uri: props.singleMedia.thumbnails.w160 }}
      />
      <View
        style={{
          width: "45%",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {props.singleMedia.title}
        </Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flexbox: {
    flexDirection: "row",
    width: "100%",
    margin: 0,
    alignContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#d9d9d9",
    marginBottom: 5,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
