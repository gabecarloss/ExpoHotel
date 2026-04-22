import React from 'react';
import { FlexBox,  } from '@/components/flexbox';
import { CustomText } from '@/components/custom-text';
import { CustomButton } from '@/components/custom-button';
import { useUsersStore } from '@/store/users-store';
import { supabaseConfig } from '@/config/supabase-config';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';


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
    return (
        <FlexBox
            gap={60}
            paddingHorizontal={50}
            justifyContent="center"
            alignItems="center"
            flex={1}
        >

            {user && (
                <>
                    <CustomText fontSize={50} value={`Welcome, ${user?.name ?? user?.email ?? "User"}!`} />
                    <CustomButton
                        onPress={onLogout}
                    >
                        Logout
                    </CustomButton>
                </>
            )}

            {!user && <CustomText fontSize={20} value="No user data avaible." />}

        </FlexBox>
    )
}