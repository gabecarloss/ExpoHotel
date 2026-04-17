import { SafeAreaView } from "react-native-safe-area-context";
import { FlexBox } from "../../../components/flexbox";
import { Image } from "react-native";
import { CustomText } from "../../../components/custom-text";
import { ACCENT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "../../../constants";
import { useRouter } from "expo-router";
import { CustomButton } from "../../../components/custom-button";


const WelcomeScreen = () => {

    const router = useRouter();

    return (
        
        <SafeAreaView
            style={{
                backgroundColor: SECONDARY_COLOR,
                flex: 1,
            }}
        >
            <FlexBox
                flex={1}
                justifyContent="center"
                alignItems="center"
                padding={50}
                gap={50}
            >

                <Image
                    source={require("../../../assets/images/expo-logo.png")}
                    style={{
                        width: 150,
                        height: 150,
                    }}
                />

                <CustomText
                    value="Welcome to ExpoHotel!"
                    fontSize={35}
                    fontColor={PRIMARY_COLOR}
                    fontWeight="bold"
                />

                <CustomText
                    value="Welcome to ExpoHotel, your ultimate hotel booking app!"
                    fontSize={20}
                    fontColor={PRIMARY_COLOR}
                    textAlign="left"
                    fontWeight="bold"
                />

                <CustomButton
                    onPress={() => {
                        router.push("/register");
                    }}
                    mode="contained"
                >
                    Get Started
                </CustomButton>

            </FlexBox>

        </SafeAreaView>
    );
};

export default WelcomeScreen;