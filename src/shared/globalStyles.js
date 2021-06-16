import { StyleSheet } from "react-native";

export const colorTheme = {
  //populate this with common colour themes we are using

  backgroundWhite: "white",
  backgroundBlueOne: "#acbcec",
  backgroundBlueTwo: "#8cbcdc",
  backgroundBlueThree: "#abdbe3",
  backgroundBlueFour: "#648cd4",
  TextBlue: "#4c74cc",
  TextBlack: "black",
};

export const tabsNavigatorStyle = {
  color: {
    feed: colorTheme.backgroundBlueOne,
    createPost: colorTheme.backgroundBlueTwo,
    profilePage: colorTheme.backgroundBlueThree,
  },
  font: {
    fontFamily: "quicksand-regular",
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.backgroundWhite,
    alignItems: "center",
    justifyContent: "center",
  },

  titleText: {
    fontFamily: "quicksand-bold",
    fontSize: 40,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginVertical: 10,
    textAlign: "center",
  },

  secondaryTitleText: {
    fontSize: 18,
    fontFamily: "quicksand-bold",
    textAlign: "right",
  },

  otherText: {
    justifyContent: "flex-start",
    left: 0,
    fontSize: 18,
    fontFamily: "quicksand-bold",
  },
  input: {
    height: 60,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontFamily: "quicksand-regular",
  },
  button: {
    backgroundColor: colorTheme.backgroundBlueTwo,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "quicksand-regular",
  },
  footerView: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
    fontFamily: "quicksand-regular",
  },
  footerLink: {
    color: "#134F5C",
    fontSize: 16,
    fontFamily: "quicksand-bold",
  },
  profileName: {
    color: "#134F5C",
    fontSize: 20,
    fontFamily: "quicksand-bold",
    textAlign: "center",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  ProfileboxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  Profilebox: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: "#dddddd",
    borderRightWidth: 1,
  },
  logOut: {
    padding: 10,
    borderRadius: 10,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorTheme.backgroundBlueThree,
  },
  createPostView: {
    margin: 10,
    position: 'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  createPostText: {
    justifyContent: "flex-start",
    left: 10,
    fontSize: 18,
    fontFamily: "quicksand-bold",
  },
  createPostInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  createPostInputLong: {
    height: 140,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  createPostButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
  },
  feedTitleText: {
    fontFamily: "quicksand-bold",
    fontSize: 40,
    textAlign: "left",
  },
  feedSubtitleText: {
    fontFamily: "quicksand-regular",
    fontSize: 18,
    textAlign: "left",
  },
});
