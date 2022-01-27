import React from "react";
import { Avatar, Card, ListItem, Text } from "react-native-elements";
import { ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";

const Single = ({ route }) => {
  const { item } = route.params;
  return (
    <Card>
      <Card.Title h4>{item.title}</Card.Title>
      <Card.Title>{item.time_added}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{ uri: uploadsUrl + item.filename }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Card.Divider />
      <Text style={styles.description}>{item.description}</Text>
      <ListItem>
        <Avatar source={{ uri: "http://placekitten.com/180" }} />
        <Text>Ownername</Text>
      </ListItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Single;
