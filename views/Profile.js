import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Card, Text, Button, ListItem, Avatar } from "react-native-elements";
import { MainContext } from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTag } from "../hooks/ApiHooks";
import { uploadsUrl } from "../utils/variables";

const Profile = ({ navigation }) => {
  const { setIsLoggedIn, user } = useContext(MainContext);
  console.log("Profile user", user);
  const [avatar, setAvatar] = useState("http://placekitten.com/640");
  const { getFileByTag } = useTag();
  const fetchAvatar = async (tag) => {
    try {
      const avatarArray = await getFileByTag("avatar_" + user.user_id);
      const avatar = avatarArray.pop();
      console.log("avatar", avatar);
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchAvatar();
  }, []);
  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <ScrollView>
      <Card>
        <Card.Title>
          <Text h1>{user.username}</Text>
        </Card.Title>
        <Card.Image
          source={{ uri: avatar }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <ListItem>
          <Avatar icon={{ name: "email", color: "black" }} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar
            icon={{ name: "user", type: "font-awesome", color: "black" }}
          />
          <Text>{user.full_name}</Text>
        </ListItem>
        <Button
          title={"My Files"}
          onPress={() => {
            navigation.navigate("My Files");
          }}
        />
        <Button
          title="Modify user"
          onPress={() => {
            navigation.navigate("Modify user");
          }}
        />
        <Button title={"Logout"} onPress={logout} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: { width: "100%", height: undefined, aspectRatio: 1 },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
