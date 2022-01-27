import React from "react";
import { Button, Input } from "react-native-elements";
import { Alert, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "../hooks/ApiHooks";
import PropTypes from "prop-types";

const RegisterForm = ({ setFormToggle }) => {
  const { postUser, checkUsername } = useUser();
  const {
    getValues,
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
      delete data.password_again;
      const userData = await postUser(data);
      console.log("register onSubmit", userData);
      if (userData) {
        setFormToggle(true);
        Alert.alert("Success", "User created successfully! Please login!");
      }
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
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
          },
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
          required: { value: true, message: "This is required." },
          minLength: {
            value: 5,
            message: "Password must be at least 5 characters",
          },
          pattern: {
            value: /(?=.*[0-9])(?=.*[A-Z])/,
            message: "One number and one capital letter required!",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required." },
          validate: async () => {
            const password1 = getValues("password");
            const password2 = getValues("password_again");
            if (password1 === password2) {
              return true;
            } else {
              return "Password is not match!";
            }
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="enter password again"
            errorMessage={
              errors.password_again && errors.password_again.message
            }
          />
        )}
        name="password_again"
      />
      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required." },
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Please enter a valid email!",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="email"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: "Full name must be at least 3 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="fullname"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />
      <Button title="Register!" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

RegisterForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default RegisterForm;
