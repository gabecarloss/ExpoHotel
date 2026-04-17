import {FlexBox} from "../components/flexbox";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { CustomText } from "../components/custom-text";

const Index = () => {

    const router = useRouter();

    const checkSession = async () => {
        setTimeout(() => {
            router.replace("/welcome");
        }, 2000);
    };

    useEffect(() => {
        checkSession();
    }, []);


    return (
        
        <FlexBox
            gap={20}
            paddingHorizontal={20}
            alignItems="center"
            justifyContent="center"
            flex={1}
        >

            <CustomText
            value = "Loading..."
            fontWeight="bold"
            fontSize={30}
            >
            </CustomText>

        </FlexBox>
    );
}

export default Index;