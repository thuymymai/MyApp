import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import List from "../components/List";
import PropTypes from "prop-types";

const Home = (props) => {
  const { navigation } = props;
  return (
    <>
      <SafeAreaView>
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
