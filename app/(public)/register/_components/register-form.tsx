import { CustomButton } from "@/components/custom-button";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { CustomText } from "@/components/custom-text";
import { FlexBox } from "@/components/flexbox";
import { ACCENT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "@/constants";
import { Dropdown } from "react-native-paper-dropdown"
import { USER_ROLES } from "@/constants";
import { Link } from "expo-router";
import React from "react";
import { registerUser } from "@/services/users";


export default function RegisterForm() {
    const [loading, setLoading] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            role: "user",
            password: "",
        },
    })
    const onSubmit = async (data: any) => {

        try {
            setLoading(true);
            const response = await registerUser(data);
            if (response.success) {
                alert("Registration sucefull! Please login.");
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert("An unexpected error ocurred.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <FlexBox
            gap={30}>
            <Controller
                control={control}
                name="name"
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FlexBox
                        gap={10}

                    >
                        <CustomText
                            value="Name"
                            textAlign="left"
                            fontSize={20}
                            fontColor={PRIMARY_COLOR}

                        />
                        <TextInput
                            placeholder="Name"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            mode="outlined"
                        />

                        {errors.name && (<CustomText
                            value="This is required."
                            fontColor="red"
                        ></CustomText>
                        )}

                    </FlexBox>


                )}
            />

            <Controller
                control={control}
                name="email"
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FlexBox
                        gap={10}
                    >
                        <CustomText
                            value="Email"
                            textAlign="left"
                            fontSize={20}
                        />

                        <TextInput
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            mode="outlined"
                        />

                        {errors.name && (
                            <CustomText
                                value="This is required."
                                fontColor="red"
                            />
                        )}
                    </FlexBox>
                )}
            />

            <Controller
                control={control}
                name="role"
                rules={{
                    required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FlexBox
                        gap={10}
                    >
                        <CustomText
                            value="Role"
                            textAlign="left"
                            fontSize={20}
                        />

                        <Dropdown
                            label=""
                            placeholder="Select your role"
                            value={value}
                            onSelect={onChange}
                            options={USER_ROLES}
                            mode="outlined"
                        />

                        {errors.name && (
                            <CustomText
                                value="This is required."
                                fontColor="red"
                            />
                        )}
                    </FlexBox>
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FlexBox
                        gap={10}
                    >
                        <CustomText
                            value="Password"
                            textAlign="left"
                            fontSize={20}
                        />

                        <TextInput
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            mode="outlined"
                            secureTextEntry
                        />

                        {errors.password && (
                            <CustomText
                                value="This is required."
                                fontColor="red"
                            />
                        )}
                    </FlexBox>
                )}
            />

            <CustomButton
                disabled={loading}
                onPress={handleSubmit(onSubmit)}
                mode="contained"
            >
                REGISTER
            </CustomButton>

            <FlexBox
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={5}
            >

                <CustomText
                    value="Already have an account?"
                    fontWeight="bold"
                />

                <Link href="/login">
                    <CustomText
                        value="LOGIN"
                        fontWeight="bold"
                        fontColor={ACCENT_COLOR}
                    />

                </Link>

            </FlexBox>
        </FlexBox>
    )
}
