import { CustomText } from "@/components/custom-text";
import { FlexBox } from "@/components/flexbox";
import { PRIMARY_COLOR, SECONDARY_COLOR, ACCENT_COLOR } from "@/constants";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "./_components/login-form";

const LoginScreen = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <FlexBox
                backgroundColor={ACCENT_COLOR}
                flex={1}
            >


                <FlexBox
                    gap={5}
                    paddingHorizontal={40}
                    paddingVertical={100}
                >

                    <CustomText
                        value="Acess your account"
                        fontSize={35}
                        fontColor={SECONDARY_COLOR}
                        fontWeight="bold"
                    />

                    <CustomText
                    value="Complete the form below to login in your account."
                    fontSize={18}
                    fontColor={PRIMARY_COLOR}
                    fontWeight="bold"
                    ></CustomText>

                </FlexBox>

                <FlexBox
                    style={{
                        borderTopLeftRadius: 50,
                    }}
                    flex={1}
                    backgroundColor={SECONDARY_COLOR}
                    paddingHorizontal={40}
                    paddingVertical={50}
                >
                    <RegisterForm />

                </FlexBox>

            </FlexBox>

        </SafeAreaView >
    );
};

export default LoginScreen;