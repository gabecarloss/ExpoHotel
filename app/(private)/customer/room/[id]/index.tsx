import { CustomText } from "@/components/custom-text";
import { FlexBox } from "@/components/flexbox";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useDebugValue, useEffect } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchHotelById } from "@/services/hotels";
import { IHotel } from "@/interfaces";
import { Image } from "react-native"
import { ACCENT_COLOR, capitalizeFirstLetter, PRIMARY_COLOR, SECONDARY_COLOR } from "@/constants";
import { Divider, Icon } from "react-native-paper";
import { ScrollView } from "react-native";
import { fetchRoom } from "@/services/rooms";
import { IRoom } from "@/interfaces";
import { fetchRoomById } from "@/services/rooms";
import AvailabilityCheck from "../_components/availability-check";

export const RoomDetailsScreen = () => {
    const params = useLocalSearchParams();
    const roomId = params.id;
    const [roomData, setRoomData] = React.useState<IRoom | null>(null);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const fetchRoomDetails = async () => {
        setLoading(true);
        const response: any = await fetchRoomById(Number(params.id));
        if (response.success) {
            setRoomData(response.data);
        }
        setLoading(false)
    }

    const renderRoomProperty = (
        label: string,
        icon: string,
        value: string,
    ) => {
        return (
            <FlexBox gap={10} flexDirection="row" alignItems="center">
                <Icon source={icon} size={20} color={ACCENT_COLOR} />
                {/*label && (
                        <CustomText
                            value={`${label}`}
                            fontSize={16}
                            fontColor={PRIMARY_COLOR}
                        />
                    )*/}
                <CustomText
                    value={value}
                    fontSize={14}
                    fontColor={PRIMARY_COLOR}
                    fontWeight="bold"
                />
            </FlexBox>
        );
    };


    useEffect(() => {
        if (roomId) {
            fetchRoomDetails();
        }
    }, [roomId])

    let imageUrl = roomData?.images && roomData.images.length > 0 ? roomData.images[0] : null;
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#E8F1F2"
            }}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            >
                {loading && (
                    <FlexBox
                        justifyContent="center"
                        alignItems="center"
                        flex={1}
                    >
                        <CustomText value="Room details screen" />
                    </FlexBox>
                )}

                {!loading && !roomData && (
                    <FlexBox justifyContent="center" alignItems="center" flex={1}>
                        <CustomText value="Room not found" />
                    </FlexBox>
                )}

                {!loading && roomData && (
                    <FlexBox
                        flex={1}
                        style={{
                            backgroundColor: SECONDARY_COLOR,
                            paddingBottom: 50,
                        }}
                    >

                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                top: 10,
                                left: 10,
                                zIndex: 10,
                                backgroundColor: SECONDARY_COLOR,
                                padding: 5,
                                borderRadius: 20,
                            }}
                            onPress={() => router.back()}
                        >
                            <View>
                                <Icon
                                    source="arrow-left" size={24} color={PRIMARY_COLOR}
                                />
                            </View>
                        </TouchableOpacity>

                        <Image
                            source={{ uri: imageUrl! }}
                            style={{
                                width: "100%",
                                height: 400,
                                borderBottomLeftRadius: 8,
                                borderBottomRightRadius: 8
                            }}
                            resizeMode="cover"
                        />

                        <FlexBox
                            style={{
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                                marginTop: -30,
                            }}
                            padding={20}
                            flex={1}
                            backgroundColor={SECONDARY_COLOR}
                            gap={5}
                        >
                            <CustomText
                                value={roomData.name!}
                                fontSize={25}
                                fontWeight="bold"
                                fontColor={PRIMARY_COLOR}
                            />
                            {renderRoomProperty("", "map-marker", roomData.type?.toUpperCase()!)}
                        </FlexBox>

                        <Divider style={{ marginVertical: 20 }} />

                        <FlexBox
                            paddingVertical={15}
                            paddingHorizontal={15}
                            gap={10}
                        >
                            <CustomText
                                value="Description"
                                fontSize={25}
                                fontColor={PRIMARY_COLOR}
                                fontWeight="bold"
                            />
                        </FlexBox>

                        <FlexBox paddingHorizontal={15} gap={10}>
                            <CustomText
                                value={roomData.description!}
                                fontSize={16}
                                fontColor={PRIMARY_COLOR}
                                fontWeight="bold"
                            />
                        </FlexBox>

                        <Divider style={{ marginVertical: 20 }} />

                        <FlexBox
                            paddingVertical={10}
                            backgroundColor={"#6c91c259"}
                            paddingHorizontal={15}
                            style={{
                                borderRadius: 5,
                            }}
                            marginHorizontal={15}
                        >
                            <CustomText value="Rent per day" />
                            <CustomText value={`$ ${roomData.rent_per_day}`}
                                fontSize={25}
                                fontColor={PRIMARY_COLOR}
                                fontWeight="bold"
                            />
                        </FlexBox>

                        <Divider style={{ marginVertical: 20 }} />

                        <FlexBox
                            paddingVertical={15}
                            paddingHorizontal={15}
                            gap={10}
                        >
                            <CustomText
                                value="Amenities"
                                fontSize={25}
                                fontColor={PRIMARY_COLOR}
                                fontWeight="bold"
                            />
                        </FlexBox>

                        <FlexBox
                            paddingHorizontal={15}
                            gap={10}
                            flexDirection="row"
                            flexWrap="wrap"
                        >
                            {roomData.amenities?.map((amenity, index) => (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        backgroundColor: "#e8e7e7",
                                        borderWidth: 0.5,
                                        borderColor: "#000",
                                        borderRadius: 5,
                                        paddingHorizontal: 8,
                                        paddingVertical: 4
                                    }}
                                >
                                    <CustomText
                                        key={index}
                                        value={`${amenity.toUpperCase()}`}
                                        fontSize={12}
                                        fontColor='#606060'
                                    />
                                </View>
                            ))}
                        </FlexBox>

                        <Divider style={{ marginVertical: 20 }} />

                        <FlexBox
                            marginVertical={20}
                            paddingVertical={15}
                            paddingHorizontal={15}
                            gap={10}
                        >
                            <CustomText
                                value="Select dates"
                                fontSize={25}
                                fontColor={PRIMARY_COLOR}
                                fontWeight="bold"
                            />
                            <AvailabilityCheck room={roomData} />

                        </FlexBox>

                    </FlexBox>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default RoomDetailsScreen;