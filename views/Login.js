import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import PropTypes from "prop-types";
import { MainContext } from "../contexts/MainContext";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(MainContext);
  console.log("login isLoggedIn", isLoggedIn);
  const logIn = async () => {
    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem("userToken", "abc");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.message);
    }
  };
  const checkToken = async () => {
    // TODO: save the value of userToken saved in AsyncStorage as userToken
    const userToken = await AsyncStorage(userToken);
    console.log("token", userToken);
    // TODO if the content of userToken is 'abc'), set isLoggedIn to true and navigate to Tabs
    userToken === "abc"
      ? setIsLoggedIn(true) && navigation.navigate("Home")
      : navigation.navigate("Login");
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
