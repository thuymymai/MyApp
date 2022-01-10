import React from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GlobalStyles from "./utils/GlobalStyles";

const mediaArray = [
  {
    key: "0",
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.",
    thumbnails: {
      w160: "http://placekitten.com/160/161",
    },
    filename: "http://placekitten.com/2048/1920",
  },
  {
    key: "1",
    title: "Title 2",
    description:
      "Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ",
    thumbnails: {
      w160: "http://placekitten.com/160/164",
    },
    filename: "http://placekitten.com/2041/1922",
  },
  {
    key: "2",
    title: "Title 3",
    description:
      "Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ",
    thumbnails: {
      w160: "http://placekitten.com/160/167",
    },
    filename: "http://placekitten.com/2039/1920",
  },
];

const App = () => {
  return (
    <>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <FlatList
          data={mediaArray}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.flexbox}>
                <Image
                  style={{ margin: 10, width: "50%", height: 300 }}
                  source={{ uri: item.thumbnails.w160 }}
                />
                <View
                  style={{
                    width: "45%",
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {item.title}
                  </Text>
                  <Text>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  flexbox: {
    flexDirection: "row",
    width: "100%",
    margin: 0,
    alignContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#d9d9d9",
    marginBottom: 5,
  },
});

export default App;
