import React, { useContext } from "react";
import { Button, Input, Text } from "react-native-elements";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { MainContext } from "../contexts/MainContext";
import { useLogin } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = () => {
  const { setIsLoggedIn, setUser } = useContext(MainContext);
  const { postLogin } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userData = await postLogin(data);
      await AsyncStorage.setItem("userToken", userData.token);
      setUser(userData.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="username"
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title="Sign in!" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default LoginForm;
