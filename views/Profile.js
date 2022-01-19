import React from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import { MainContext } from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(MainContext);
  console.log("profile isLoggedIn", isLoggedIn);
  const logout = async () => {
    setIsLoggedIn(false);
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch(error) {
      console.log("error", error.message);
    }
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title={"Logout"} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
