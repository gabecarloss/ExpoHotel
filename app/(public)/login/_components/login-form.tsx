import { CustomButton } from "@/components/custom-button";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { CustomText } from "@/components/custom-text";
import { FlexBox } from "@/components/flexbox";
import { ACCENT_COLOR } from "@/constants";
import { Dropdown } from "react-native-paper-dropdown";
import { USER_ROLES } from "@/constants";
import { Link } from "expo-router";
import React from "react";
import { loginUser } from "@/services/users";
import { useRouter } from "expo-router";
import { useUsersStore } from "@/store/users-store";
import Toast from "react-native-toast-message";

export default function LoginForm() {
    const [loading, setLoading] = React.useState(false);
    const { setUser } = useUsersStore();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);

            const response = await loginUser({
                email: data.email,
                password: data.password,
            });

            if (!response.success) {
                Toast.show({
                    type: "error",
                    text1: "Login failed",
                    text2: response.message,
                });
                return;
            } else {
                Toast.show({
                    text1: "Login successfull!",
                })
            }

            setUser(response.data);

            const role = response.data?.role?.toLowerCase();

            const routes = {
                customer: "/customer/home",
                owner: "/owner/home",
                admin: "/admin/home",
            };

            const route = routes[role as keyof typeof routes];

            if (!route) {
                alert("Invalid role or without defined route.");
                return;
            }

            router.push(route as any);

        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "An error ocurred",
                text2: (error as Error).message,
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <FlexBox gap={30}>

            { }
            <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FlexBox gap={10}>
                        <CustomText value="Email" fontSize={20} />

                        <TextInput
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            mode="outlined"
                        />

                        {errors.email && (
                            <CustomText value="This is required." fontColor="red" />
                        )}
                    </FlexBox>
                )}
            />

            { }
            <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <FlexBox gap={10}>
                        <CustomText value="Password" fontSize={20} />

                        <TextInput
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                            mode="outlined"
                        />

                        {errors.password && (
                            <CustomText value="This is required." fontColor="red" />
                        )}
                    </FlexBox>
                )}
            />

            { }
            <CustomButton
                disabled={loading}
                onPress={handleSubmit(onSubmit)}
                mode="contained"
            >
                LOGIN
            </CustomButton>

            { }
            <FlexBox flexDirection="row" justifyContent="center" gap={5}>
                <CustomText value="Don't have an account?" />
                <Link href="/register">
                    <CustomText value="REGISTER" fontColor={ACCENT_COLOR} />
                </Link>
            </FlexBox>

        </FlexBox>
    );
}