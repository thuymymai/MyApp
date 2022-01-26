import React from "react";
import { Image, Text } from "react-native-elements";
import { TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";

const ListItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Single", { item: props.singleMedia });
      }}
    >
      <View>
        <Image
          source={{ uri: uploadsUrl + props.singleMedia.thumbnails.w160 }}
        />
      </View>
      <View>
        <Text>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//     padding: 15,
//     backgroundColor: "#eee",
//     borderRadius: 6,
//     marginHorizontal: 10,
//     marginBottom: 5,
//   },
//   imagebox: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     borderRadius: 6,
//   },
//   textbox: {
//     flex: 2,
//     padding: 10,
//   },
//   listTitle: {
//     fontWeight: "bold",
//     fontSize: 20,
//     paddingBottom: 15,
//   },
// });

ListItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
