import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import React from 'react';
import { Hotels } from './_components/hotels';
import { Bookings } from './_components/bookings';
import { Report } from './_components/report';
import { Profile } from './_components/profile';
import { BottomNavigation } from 'react-native-paper';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants';
import { useNavigation } from 'expo-router';

const CustomerHomePage = () => {
    const [index, setIndex] = React.useState(0);
    const navigation = useNavigation();

    const tabsData = [
        {
            key: "hotels",
            title: "Hotels",
            focusedIcon: "home-city",
            unfocusedIcon: "home-city-outline",
        },

        {
            key: "bookings",
            title: "Bookings",
            focusedIcon: "book-open-page-variant",
            unfocusedIcon: "book-open-page-variant-outline",
        },

        {
            key: "report",
            title: "Report",
            focusedIcon: "chart-box",
            unfocusedIcon: "chart-box-outline",
        },

        {
            key: "profile",
            title: "Profile",
            focusedIcon: "account-circle",
            unfocusedIcon: "account-circle-outline",
        },
    ]

    const renderScene = BottomNavigation.SceneMap({
        hotels: Hotels,
        bookings: Bookings,
        report: Report,
        profile: Profile,
    });

        useEffect(() => {
            let backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
                if (navigation.isFocused()) {
                     Alert.alert("Exit the app?", "", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel",
                    },
                    { text: "Yes", onPress: () => BackHandler.exitApp() },
                ]);
                return true;
                }
            });
        });

    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <BottomNavigation
                navigationState={{ index, routes: tabsData }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={{ backgroundColor: SECONDARY_COLOR, borderTopColor: "gray", borderTopWidth: 0.5 }}
                shifting={true}
                activeColor={PRIMARY_COLOR}
                activeIndicatorStyle={{ backgroundColor: 'transparent' }}
            />
        </SafeAreaView>
    );
};

export default CustomerHomePage;