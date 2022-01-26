import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, Image } from "react-native-elements";
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
    <SafeAreaView>
      <Text>Profile</Text>
      <Text>{user.username}</Text>
      <Image
        source={{ uri: avatar }}
        style={{ width: "80%", height: "50%" }}
        resizeMode="contain"
      ></Image>
      <Text>{user.email}</Text>
      <Text>{user.full_name}</Text>
      <Button title={"Logout"} onPress={logout} />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 40,
//   },
// });

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
