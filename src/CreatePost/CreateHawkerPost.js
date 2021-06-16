import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { globalStyles } from "../shared/globalStyles";
import { Rating } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { firebase } from "../shared/config";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CreateFood({ navigation }) {
  const [image, setImage] = useState("");
  const [StallName, setStallName] = useState("");
  const [Location, setLocation] = useState("");
  const [openRegion, setOpenRegion] = useState(false);
  const [region, setRegion] = useState("");
  const [itemsRegion, setItemsRegion] = useState([
    { label: "East", value: "East" },
    { label: "West", value: "West" },
    { label: "Central", value: "Central" },
    { label: "North", value: "North" },
    { label: "South", value: "South" },
  ]);
  const [Review, setReview] = useState("");
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

  const setData = async () => {
    let user = firebase.auth().currentUser;
    var newHawkerRef = firebase.firestore().collection("hawkerData").doc();
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    var imageRef = firebase
      .storage()
      .ref(
        newHawkerRef.id + "/0." + image.split(".")[image.split(".").length - 1]
      );
    imageRef.put(blob).then(() => {
      newHawkerRef
        .set({
          stallName: StallName,
          Location: Location,
          region: region,
          cuisine: Cuisine,
          rating: ratingCount + 1,
          saves: 0,
          reviews: [
            {
              image: "0." + image.split(".")[image.split(".").length - 1],
              review: Review,
            },
          ],
        })
        .then(() => {
          firebase
            .firestore()
            .collection("userData")
            .doc(user.uid)
            .update({
              hawkerPosts: firebase.firestore.FieldValue.arrayUnion(
                newHawkerRef.id
              ),
            });
        })
        .then(() => {
          navigation.navigate("Back");
          navigation.navigate("Explore");
        });
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <View style={globalStyles.createPostView}>
      <KeyboardAwareScrollView>
        {image ? (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          </View>
        ) : null}
        <TouchableOpacity
          style={{ ...globalStyles.button, marginBottom: 20, marginTop: 10 }}
          onPress={pickImage}
        >
          <Text style={globalStyles.secondaryTitleText}>Pick an Image!</Text>
        </TouchableOpacity>
        <Text style={globalStyles.createPostText}>Stall Name</Text>
        <TextInput
          style={globalStyles.createPostInput}
          onChangeText={(text) => setStallName(text)}
          placeholder="Stall Name"
        />
        <Text style={globalStyles.createPostText}>Location</Text>
        <TextInput
          style={globalStyles.createPostInput}
          onChangeText={(text) => setLocation(text)}
          placeholder="Location"
        />
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
        <Text style={globalStyles.createPostText}>Review</Text>
        <TextInput
          style={{
            height: 230,
            margin: 12,
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          onChangeText={(text) => setReview(text)}
          placeholder="Review"
          multiline
          numberOfLines={4}
        />
        <Text style={globalStyles.createPostText}>Rating</Text>
        <Rating
          imageSize={40}
          onFinishRating={(rating) => setRatingCount(rating)}
        />
        <Text></Text>
        <TouchableOpacity
          style={{ ...globalStyles.button, marginBottom: 20 }}
          onPress={setData}
        >
          <Text style={globalStyles.secondaryTitleText}>Create Post!</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
