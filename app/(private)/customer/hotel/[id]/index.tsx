import { CustomText } from "@/components/custom-text";
import { FlexBox } from "@/components/flexbox";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchHotelById } from "@/services/hotels";
import { IHotel } from "@/interfaces";
import { Image } from "react-native"
import { ACCENT_COLOR, capitalizeFirstLetter, PRIMARY_COLOR, SECONDARY_COLOR } from "@/constants";
import { Divider, Icon } from "react-native-paper";
import { ScrollView } from "react-native";
import { fetchRooms } from "@/services/rooms";
import { IRoom } from "@/interfaces";

export const HotelDetailsScreen = () => {
    const params = useLocalSearchParams();
    const hotelId = params.id;
    const [hotelData, setHotelData] = React.useState<IHotel | null>(null);
    const [roomsData, setRoomsData] = React.useState<IRoom[]>([]);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const fetchHotelDetails = async () => {
        setLoading(true);
        const response = await fetchHotelById(hotelId as string);
        if (response.success) {
            setHotelData(response.data);
            const roomsResponse: any = await fetchRooms(params.id as unknown as number);
            if (roomsResponse.success) {
                setRoomsData(roomsResponse.data);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (hotelId) {
            fetchHotelDetails();
        }
    }, [hotelId]);

    let imageUrl = hotelData?.images && hotelData.images.length > 0 ? hotelData.images[0] : null;

    const renderHotelProperty = (
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
                        <CustomText value="Hotel details screen" />
                    </FlexBox>
                )}

                {!loading && !hotelData && (
                    <FlexBox justifyContent="center" alignItems="center" flex={1}>
                        <CustomText value="Hotel not found" />
                    </FlexBox>
                )}

                {!loading && hotelData && (
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
                                value={hotelData.name!}
                                fontSize={22}
                                fontWeight="bold"
                                fontColor={PRIMARY_COLOR}
                            />
                            {renderHotelProperty("", "map-marker", hotelData.city?.toUpperCase()!)}
                        </FlexBox>

                        <Divider style={{ marginVertical: 20 }} />


                        <FlexBox
                            paddingVertical={15}
                            paddingHorizontal={15}
                            gap={10}
                        >
                            <CustomText
                                value="Contact and Address"
                                fontSize={20}
                                fontColor={PRIMARY_COLOR}
                                fontWeight="bold"
                            />
                        </FlexBox>
                        <FlexBox paddingHorizontal={15} gap={10}>
                            {renderHotelProperty(
                                "Email: ",
                                "email",
                                hotelData.email ? hotelData.email : "N/A",
                            )}
                            {renderHotelProperty(
                                "Phone: ",
                                "phone",
                                hotelData.phone ? hotelData.phone : "N/A",
                            )}
                            {renderHotelProperty(
                                "Location: ",
                                "map-marker",
                                hotelData.address ? hotelData.address : "N/A",
                            )}
                        </FlexBox>

                        <Divider style={{ marginVertical: 20 }} />


                        <FlexBox
                            paddingVertical={15}
                            paddingHorizontal={15}
                            gap={10}
                        >
                            <CustomText
                                value="Description"
                                fontSize={20}
                                fontColor={PRIMARY_COLOR}
                                fontWeight="bold"
                            />
                        </FlexBox>
                        <FlexBox paddingHorizontal={15} gap={10}>
                            <CustomText
                                value={hotelData.description!}
                                fontSize={16}
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
                                fontSize={20}
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
                            {hotelData.amenities?.map((amenity, index) => (
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
                            paddingVertical={25}
                            paddingHorizontal={15}
                            gap={10}
                        >
                            <CustomText
                                value="Rooms"
                                fontSize={20}
                                fontColor={PRIMARY_COLOR}
                                fontWeight="bold"
                            />

                            {roomsData.length > 0 ? (
                                roomsData.map((room: IRoom) => <FlexBox
                                    backgroundColor={ACCENT_COLOR}
                                    padding={15}
                                    style={{
                                        borderRadius: 8,
                                        borderWidth: 0.5,
                                        borderColor: PRIMARY_COLOR,
                                    }}
                                    key={room.id}
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <FlexBox>
                                        <CustomText
                                            value={room.name!} fontSize={14} fontWeight="bold"
                                        />
                                        <CustomText
                                            value={capitalizeFirstLetter(room.type!)}
                                        />
                                    </FlexBox>

                                    <FlexBox
                                        padding={5}
                                        style={{
                                            borderRadius: 5,
                                        }}
                                        alignItems="center"
                                    >
                                        <CustomText value={`$${room.rent_per_day}`} fontColor={PRIMARY_COLOR} fontWeight="bold" />                                 </FlexBox>
                                </FlexBox>)
                            ) : (
                                <CustomText
                                    value="No rooms avaible for this hotel."
                                    fontSize={14}
                                    fontColor={PRIMARY_COLOR}
                                />
                            )}

                        </FlexBox>
                    </FlexBox>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HotelDetailsScreen;