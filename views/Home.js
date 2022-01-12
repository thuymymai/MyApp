import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import GlobalStyles from "../utils/GlobalStyles";
import List from "../components/List";
import PropTypes from "prop-types";

const Home = (props) => {
  const { navigation } = props;
  return (
    <>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <List navigation={navigation}></List>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
