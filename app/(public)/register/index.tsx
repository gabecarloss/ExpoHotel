import { CustomText } from "@/components/custom-text";
import { FlexBox } from "@/components/flexbox";
import { PRIMARY_COLOR, SECONDARY_COLOR, ACCENT_COLOR } from "@/constants";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "./_components/register-form";
import { ScrollView } from "react-native";

const RegisterScreen = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <ScrollView>
                <FlexBox
                    backgroundColor={PRIMARY_COLOR}
                    flex={1}
                >


                    <FlexBox
                        gap={5}
                        paddingHorizontal={40}
                        paddingVertical={100}
                    >

                        <CustomText
                            value="Create Account"
                            fontSize={35}
                            fontColor={SECONDARY_COLOR}
                            fontWeight="bold"
                        />

                        <CustomText
                            value="Complete the form below to get started!"
                            fontSize={18}
                            fontColor={ACCENT_COLOR}
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

            </ScrollView>
        </SafeAreaView >
    );
};

export default RegisterScreen;