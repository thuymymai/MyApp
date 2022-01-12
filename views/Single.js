import React from "react";
import { Button, Image, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";

const Single = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <View>
      <Image
        source={{ uri: uploadsUrl + item.thumbnails.w160 }}
        style={styles.image}
      />
      <Text style={styles.listTitle}>{item.title}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 15,
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 15,
    textAlign: "center",
  },
});

Single.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Single;
