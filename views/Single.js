import { React, useRef, useState, useEffect } from "react";
import { Avatar, Card, ListItem, Text } from "react-native-elements";
import { ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hooks/ApiHooks";

const Single = ({ route }) => {
  const { item } = route.params;
  const videoRef = useRef(null);
  const { getUserById } = useUser();
  const [user, setUser] = useState("Owner");
  const getUser = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      const response = await getUserById(userToken, item.user_id);
      console.log("Response for use", response);
      setUser(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Card>
      <Card.Title h4>{item.title}</Card.Title>
      <Card.Title>{item.time_added}</Card.Title>
      <Card.Divider />
      {item.media_type === "image" ? (
        <Card.Image
          source={{ uri: uploadsUrl + item.filename }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : (
        <Video
          ref={videoRef}
          style={styles.image}
          source={{ uri: uploadsUrl + item.filename }}
          useNativeControls
          resizeMode="contain"
        ></Video>
      )}
      <Card.Divider />
      <Text style={styles.description}>{item.description}</Text>
      <ListItem>
        <Avatar source={{ uri: "http://placekitten.com/180" }} />
        <Text>{user.username}</Text>
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
