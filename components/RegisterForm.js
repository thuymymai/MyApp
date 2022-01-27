import React from "react";
import { Text, Button, Input } from "react-native-elements";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "../hooks/ApiHooks";

const RegisterForm = () => {
  const { postUser, checkUsername } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      full_name: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userData = await postUser(data);
      console.log("register onSubmit", userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required." },
          validate: async (value) => {
            try {
              const available = await checkUsername(value);
              console.log("available", available);
              if (available) {
                return true;
              } else {
                return "Username is already taken!";
              }
            } catch (error) {
              throw Error(error.message);
            }
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
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
            placeholder="email"
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="fufllname"
          />
        )}
        name="full_name"
      />
      <Button title="Register!" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default RegisterForm;
