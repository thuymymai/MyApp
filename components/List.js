import React from "react";
import { Text, FlatList, TouchableOpacity, Image, View } from "react-native";

const List = () => {
  return (
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
  );
};
