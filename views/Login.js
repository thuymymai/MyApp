import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { MainContext } from "../contexts/MainContext";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin, useUser } from "../hooks/ApiHooks";
import LoginForm from "../components/LoginForm";

const Login = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(MainContext);
  const { postLogin } = useLogin();
  const { getUserByToken } = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log("checkToken", userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    // hardcoded username and password
    const data = { username: "amy", password: "test12345" };
    try {
      const userData = await postLogin(data);
      await AsyncStorage.setItem("userToken", userData.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <LoginForm navigation={navigation} />
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
