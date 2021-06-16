import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../shared/config";
import { globalStyles } from "../shared/globalStyles";
import HawkerfeedScreen from "./HawkerFeed";
import RecipefeedScreen from "./RecipeFeed";
import HawkerCard from "../HawkerCard";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import HawkerFilter from "./HawkerFilter";

export default function Home({ navigation }) {
  const [feed, setFeed] = useState("recipe");
  const [hidden, setHidden] = useState(false);
  const [modal, setModalVisible] = useState(false);
  const [modalRecipe, setModalRecipeVisible] = useState(false);

  return (
    <View style={globalStyles.container}>
      {!hidden && (
        <>
          <FontAwesome
            name="filter"
            size={30}
            style={{
              left: 25,
              top: 55,
              zIndex: 100,
              backgroundColor: "transparent",
              position: "absolute",
              color: "white",
              opacity: 0.8,
            }}
            onPress={() => setModalVisible(true)}
          />
          <Modal
            animationType="slide"
            visible={modal}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <TouchableOpacity
              style={{ marginTop: 40, marginLeft: 30 }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={32}
                color="black"
              />
            </TouchableOpacity>
            <View style={globalStyles.container}>
              <HawkerFilter></HawkerFilter>
            </View>
          </Modal>
          <Text
            style={{
              fontFamily:
                feed === "recipe" ? "quicksand-bold" : "quicksand-regular",
              left: 135,
              top: 60,
              zIndex: 100,
              backgroundColor: "transparent",
              fontSize: 20,
              position: "absolute",
              color: feed === "recipe" ? "#648cd4" : "white",
              opacity: feed === "recipe" ? 1.0 : 0.8,
            }}
            onPress={() => setFeed("recipe")}
          >
            Recipe
          </Text>
          <Text
            style={{
              fontFamily: "quicksand-bold",
              left: 205,
              top: 60,
              zIndex: 100,
              backgroundColor: "transparent",
              fontSize: 20,
              position: "absolute",
              color: "white",
              opacity: 0.5,
            }}
          >
            |
          </Text>
          <Text
            style={{
              fontFamily:
                feed === "hawker" ? "quicksand-bold" : "quicksand-regular",
              left: 215,
              top: 60,
              zIndex: 100,
              backgroundColor: "transparent",
              fontSize: 20,
              position: "absolute",
              color: feed === "hawker" ? "#648cd4" : "white",
              opacity: feed === "hawker" ? 1.0 : 0.8,
            }}
            onPress={() => setFeed("hawker")}
          >
            Hawker
          </Text>
        </>
      )}
      <>
        {feed === "recipe" ? (
          <RecipefeedScreen setHidden={setHidden} />
        ) : (
          <HawkerfeedScreen setHidden={setHidden} />
        )}
      </>
    </View>
  );
}
