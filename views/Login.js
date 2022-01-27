import React from "react";
import { Card } from "react-native-elements";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View,
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
        <View style={styles.form}>
          <Card>
            <Card.Title h4>Login</Card.Title>
            <Card.Divider />
            <LoginForm />
          </Card>
          <Card>
            <Card.Title h4>Register</Card.Title>
            <Card.Divider />
            <RegisterForm />
          </Card>
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    flex: 8,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
