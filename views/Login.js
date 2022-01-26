import React from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import PropTypes from "prop-types";
import { MainContext } from "../contexts/MainContext";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hooks/ApiHooks";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = ({ navigation }) => {
  const { setIsLoggedIn, setUser } = useContext(MainContext);
  const { getUserByToken } = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log("checkToken", userData);
      console.log("token", userToken);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1 }}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={styles.container}
      >
        <Text>Login</Text>
        <LoginForm />
        <Text>Sign up</Text>
        <RegisterForm />
      </KeyboardAvoidingView>
    </TouchableOpacity>
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
