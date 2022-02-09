import { React, useRef, useState, useEffect } from "react";
import { Avatar, Card, ListItem, Text, Button } from "react-native-elements";
import { ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavorite, useUser } from "../hooks/ApiHooks";

const Single = ({ route }) => {
  const { item } = route.params;
  const videoRef = useRef(null);
  const { getUserById } = useUser();
  const [user, setUser] = useState("Owner");
  const [likedUser, setLikedUser] = useState("");
  const [like, setLike] = useState([null]);
  const { addFavorite, getFavoriteByFileId, deleteFavorite } = useFavorite();

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      const response = await getUserById(userToken, item.user_id);
      console.log("Response for user", response);
      setUser(response);
    } catch (error) {
      console.error(error);
      setUser({ username: "[not available]" });
    }
  };

  const likeFunc = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      console.log("item file id", item.file_id);
      await addFavorite(item.file_id, userToken);
    } catch (error) {
      console.error(error);
    }
  };

  const unLikeFunc = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      await deleteFavorite(item.file_id, userToken);
    } catch (error) {
      console.error(error);
    }
  };

  const getLike = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      const response = await getFavoriteByFileId(item.file_id, userToken);
      setLike(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getLike();
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
      <ListItem>
        <Button
          style={{ height: 50, width: 50 }}
          title={"Like"}
          onPress={likeFunc}
        ></Button>
        <Button
          style={{ height: 50, width: 70 }}
          title={"Unlike"}
          onPress={unLikeFunc}
        ></Button>
        <Text>Likes count: {like.length}</Text>
      </ListItem>
      <Text>User liked: {likedUser}</Text>
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
