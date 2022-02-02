import { Button, Input, Text, Card } from "react-native-elements";
import { ScrollView } from "react-native";
import { React, useState, useContext } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useMedia } from "../hooks/ApiHooks";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainContext } from "../contexts/MainContext";

const Upload = ({ navigation }) => {
  const [image, setImage] = useState(
    "https://place-hold.it/300x200&text=Choose"
  );
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState("");
  const { postMedia } = useMedia();
  const { update, setUpdate } = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };
  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert("Please select a file!");
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    const filename = image.split("/").pop();
    let fileExtension = filename.split(".").pop();
    fileExtension = fileExtension === "jpg" ? "jpeg" : fileExtension;
    formData.append("file", {
      uri: image,
      name: filename,
      type: type + "/" + fileExtension,
    });
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await postMedia(formData, userToken);
      console.log(response);
      Alert.alert("Upload", "Uploaded successfully", [
        {
          text: "OK",
          onPress: () => {
            setUpdate(update + 1);
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView>
      <Card>
        <Card.Image
          source={{ uri: image }}
          style={{ height: 300, marginBottom: 15 }}
          onPress={pickImage}
        ></Card.Image>
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
              placeholder="title"
            />
          )}
          name="title"
        />
        {errors.title && <Text>This is required.</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="description"
            />
          )}
          name="description"
        />
        {errors.description && <Text>This is required.</Text>}

        <Button title="Upload" onPress={handleSubmit(onSubmit)} />
      </Card>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
