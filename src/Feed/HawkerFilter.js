import React, { useState, } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../shared/globalStyles";
import { Rating } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function HawkerFilter() {
  const [openRegion, setOpenRegion] = useState(false);
  const [region, setRegion] = useState("");
  const [itemsRegion, setItemsRegion] = useState([
    { label: "East", value: "East" },
    { label: "West", value: "West" },
    { label: "North", value: "North" },
    { label: "South", value: "South" },
  ]);
  const [ratingCount, setRatingCount] = useState(0);
  const [openCuisine, setOpenCuisine] = useState(false);
  const [Cuisine, setCuisine] = useState([]);
  const [itemsCuisine, setItemsCuisine] = useState([
    { label: "Japanese", value: "Japanese" },
    { label: "Italian", value: "Italian" },
    { label: "Korean", value: "Korean" },
    { label: "Chinese", value: "Chinese" },
    { label: "Western", value: "Western" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Halal", value: "Halal" },
    { label: "Others", value: "Others" },
  ]);

  return (
    <View style={globalStyles.createPostView}>
      <KeyboardAwareScrollView>
        <Text style={globalStyles.createPostText}>Region</Text>
        <DropDownPicker
          mode="BADGE"
          placeholder="Select the region"
          containerProps={{
            paddingRight: 20,
            margin: 10,
          }}
          multiple={false}
          open={openRegion}
          value={region}
          items={itemsRegion}
          setOpen={setOpenRegion}
          setValue={setRegion}
          setItems={setItemsRegion}
          zIndex={3000}
          zIndexInverse={1000}
          maxHeight={250}
          bottomOffset={100}
        />
        <Text style={globalStyles.createPostText}>Cuisine</Text>
        <DropDownPicker
          mode="BADGE"
          placeholder="Select the cuisine(s)"
          containerProps={{
            paddingRight: 20,
            margin: 10,
          }}
          multiple={true}
          min={0}
          max={5}
          open={openCuisine}
          value={Cuisine}
          items={itemsCuisine}
          setOpen={setOpenCuisine}
          setValue={setCuisine}
          setItems={setItemsCuisine}
          zIndex={1000}
          zIndexInverse={3000}
          maxHeight={250}
          bottomOffset={100}
        />
        <Text style={globalStyles.createPostText}>Rating</Text>
        <Rating
          imageSize={40}
          onFinishRating={(rating) => setRatingCount(rating)}
        />
        <Text></Text>
        <TouchableOpacity style={{ ...globalStyles.button, marginBottom: 20 }}>
          <Text style={globalStyles.secondaryTitleText}>Set Filter!</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
