import { React, useRef, useState, useEffect, useContext } from "react";
import { Avatar, Card, ListItem, Text, Button } from "react-native-elements";
import { ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavorite, useUser } from "../hooks/ApiHooks";
import { MainContext } from "../contexts/MainContext";

const Single = ({ route }) => {
  const { user } = useContext(MainContext);
  const { item } = route.params;
  const videoRef = useRef(null);
  const { getUserById } = useUser();
  const [owner, setOwner] = useState("Owner");
  const [like, setLike] = useState([null]);
  const { addFavorite, getFavoriteByFileId, deleteFavorite } = useFavorite();
  const [userLike, setUserLike] = useState(false);

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      const response = await getUserById(userToken, item.user_id);
      console.log("Response for user", response);
      setOwner(response);
    } catch (error) {
      console.error(error);
      setOwner({ username: "[not available]" });
    }
  };

  const likeFunc = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      console.log("item file id", item.file_id);
      const response = await addFavorite(item.file_id, userToken);
      response && setUserLike(true);
      console.log("users liked", response);
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
      const response = await deleteFavorite(item.file_id, userToken);
      response && setUserLike(false);
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
      response.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
      setLike(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getLike();
  }, [userLike]);

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
        <Text>{owner.username}</Text>
      </ListItem>
      <ListItem>
        <Button
          disabled={userLike}
          style={{ height: 50, width: 50 }}
          title={"Like"}
          onPress={likeFunc}
        ></Button>
        <Button
          disabled={!userLike}
          style={{ height: 50, width: 70 }}
          title={"Unlike"}
          onPress={unLikeFunc}
        ></Button>
        <Text>Likes count: {like.length}</Text>
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
