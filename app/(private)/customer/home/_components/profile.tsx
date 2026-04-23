import React from 'react';
import { FlexBox, } from '@/components/flexbox';
import { CustomText } from '@/components/custom-text';
import { CustomButton } from '@/components/custom-button';
import { useUsersStore } from '@/store/users-store';
import { supabaseConfig } from '@/config/supabase-config';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import TabTitle from './tab-title';
import { Image } from 'react-native';


export const Profile = () => {

    const router = useRouter();
    const { user } = useUsersStore();

    const onLogout = () => {
        try {
            supabaseConfig.auth.signOut();
            router.replace("/(public)/login");
            Toast.show({
                text1: "Logged out successfully!",
            })
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error login out!",
                text2: (error as Error).message,
            })
        }
    }

    const renderUserPropertyValue = (label: string, value: string) => {
        return (
            <FlexBox>
                <CustomText value={label} fontSize={14} fontWeight='bold' />
                <CustomText value={value} fontSize={16} />
            </FlexBox>
        );
    };

    return (
        <FlexBox
            gap={35}
            padding={20}
            flex={1}
        >
            <TabTitle title="Profile" caption="Manage your account profile!" />
            <FlexBox
                padding={20}
                style={{
                    borderWidth: 1,
                    borderColor: "d3d3d3",
                    borderRadius: 5,
                }}
            >
                <FlexBox
                    alignItems='center'
                    gap={15}
                >
                    <Image
                        source={{ uri: user?.profile_picture }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                    <CustomButton
                        mode="outlined">
                        Change Profile Picture
                    </CustomButton>
                </FlexBox>

                <FlexBox
                    gap={15}
                    paddingVertical={20}
                >
                    {renderUserPropertyValue("Name", user?.name || "")}
                    {renderUserPropertyValue("Email", user?.email || "")}
                    {renderUserPropertyValue("Role", user?.role || "")}
                    {renderUserPropertyValue(
                        "Account Created At",
                        new Date(user?.created_at || "").toLocaleDateString(),
                    )}
                </FlexBox>
            </FlexBox>

            <CustomButton
                onPress={ onLogout }
                >
                Logout
            </CustomButton>

        </FlexBox>
    );
};

export default Profile;