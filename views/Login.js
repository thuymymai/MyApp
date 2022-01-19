import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import PropTypes from "prop-types";
import { MainContext } from "../contexts/MainContext";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(MainContext);
  console.log("login isLoggedIn", isLoggedIn);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log("token", userToken);
    if (userToken === "abc") {
      setIsLoggedIn(true);
    }
    useEffect(() => {
      checkToken();
    }, []);
  };

  const logIn = async () => {
    try {
      await AsyncStorage.setItem("userToken", "abc");
      4;
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

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
