import React, { useState, useEffect } from 'react';
import { View } from 'react-native'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer, DefaultTheme, configurefonts } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import Home from './Home'
import TabOne from './TabOne'
import TabTwo from './TabTwo'

import { tabsNavigatorStyle } from './shared/globalStyles'

const TabsNavigator = createMaterialBottomTabNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF'
    },
}

export default function TabNavigator() {
    return (
        <NavigationContainer theme={MyTheme}>
            <TabsNavigator.Navigator
                backBehavior='none'
                inactiveColor='#A9A9A9'
                activeColor='#383838'
                shifting={true}
            >

                <TabsNavigator.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarColor: tabsNavigatorStyle.color.home,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-home" color={color} size={26} />
                        ),
                    }}
                />
                <TabsNavigator.Screen
                    name="Tab One"
                    component={TabOne}
                    options={{
                        tabBarLabel: 'Tab One',
                        tabBarColor: tabsNavigatorStyle.color.tabOne,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="people-circle-outline" color={color} size={26} />
                        ),
                    }}
                />

                <TabsNavigator.Screen
                    name="Tab Two"
                    component={TabTwo}
                    options={{
                        tabBarLabel: 'Tab Two',
                        tabBarColor: tabsNavigatorStyle.color.tabTwo,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-person" color={color} size={26} />
                        ),
                    }}
                />

            </TabsNavigator.Navigator>
        </NavigationContainer>
    )

}