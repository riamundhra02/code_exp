import { StyleSheet } from 'react-native'

export const colorTheme = { //populate this with common colour themes we are using

    backgroundWhite: 'white',
    backgroundBlueOne: '#acbcec',
    backgroundBlueTwo: '#8cbcdc',
    backgroundBlueThree: '#abdbe3',
    backgroundBlueFour: "#648cd4",
    TextBlue: '#4c74cc',
    TextBlack:"black"

}

export const tabsNavigatorStyle = {

    color: {
        feed: colorTheme.backgroundBlueOne,
        createPost: colorTheme.backgroundBlueTwo,
        profilePage: colorTheme.backgroundBlueThree,
    },
    font: {
        fontFamily: 'quicksand-regular'
    }
}


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.backgroundWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText: {
        fontFamily: 'quicksand-bold',
        fontSize: 40,
        paddingHorizontal: 7,
        paddingVertical: 2,
        marginVertical: 10,
        textAlign: 'center'
    },

    secondaryTitleText: {
        fontSize: 18,
        fontFamily: 'quicksand-bold',
        textAlign: 'center'
    },

    otherText: {
        justifyContent: 'flex-start',
        left: 0,
        fontSize: 18,
        fontFamily: 'quicksand-bold',
    }
})





