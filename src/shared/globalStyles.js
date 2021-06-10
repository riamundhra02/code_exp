import { StyleSheet } from 'react-native'

export const colorTheme = { //populate this with common colour themes we are using

    backgroundWhite: 'white',
    backgroundBeige: '#fff2cc',
    backgroundGreen: '#d8ead2',
    backgroundLightOrange: '#fce5cd',
    backgroundLightBlue: '#c9daf8',
    backgroundLightRed: '#f4cccc',

}

export const tabsNavigatorStyle = {

    color: {
        home: colorTheme.backgroundBeige,
        tabOne: colorTheme.backgroundLightRed,
        tabTwo: colorTheme.backgroundLightBlue,
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





