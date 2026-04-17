import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { getLoggedInUser } from '@/services/users';
import { FlexBox } from '@/components/flexbox';
import { CustomText } from '@/components/custom-text';
import { IUser } from '@/interfaces';
import { CustomButton } from '@/components/custom-button';

const CustomerHomePage = () => {

    const [user, setUser] = React.useState<IUser | null>(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await getLoggedInUser();
            if (!response.success) {
                throw new Error(response.message);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <FlexBox
                gap={10}
                justifyContent="center"
                alignItems="center"
                flex={1}
            >
                {loading && <CustomText value="Loading..." />}
                {error && <CustomText value={`Error: ${error}`} />}
                {user && (
                    <>
                        <CustomText value={`Welcome, ${user.name}!`} />
                        <CustomText value={`Email, ${user.email}!`} />
                        <CustomButton>
                            Logout
                        </CustomButton>
                    </>
                )}
            </FlexBox>
        </SafeAreaView>
    );
};

export default CustomerHomePage;