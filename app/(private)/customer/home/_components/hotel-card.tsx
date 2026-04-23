import React from 'react';
import { IHotel } from '@/interfaces';
import { FlexBox } from '@/components/flexbox';
import { Image, View } from 'react-native';
import { CustomText } from '@/components/custom-text';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants';

export const HotelCard = ({ hotel }: { hotel: IHotel }) => {
    let imageUrl = hotel.images && hotel.images.length > 0 ? hotel.images[0] : null;

    const firstThreeAmenities = hotel.amenities ? hotel.amenities.slice(0, 3) : [];
    return (
        <FlexBox
            style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#a0a0a0",
                marginBottom: 50,
                backgroundColor: "#6C91C2"
            }}
        >
            <Image
                source={{ uri: imageUrl! }}
                style={{ width: "100%", height: 200, borderRadius: 10, }}
                resizeMode="cover"
            />

            <FlexBox
                flexDirection='row'
                justifyContent='space-between'
                padding={15}
            >
                <CustomText
                    value={hotel.name!}
                    fontSize={18}
                    fontWeight='bold'
                    fontColor={PRIMARY_COLOR}
                />

                <CustomText
                    value={`$${hotel.starting_rent}/night`}
                    fontSize={18}
                    fontWeight='bold'
                    fontColor={PRIMARY_COLOR}
                />
            </FlexBox>

            <FlexBox
                paddingHorizontal={15}
            >
                <CustomText value={hotel.address!} fontSize={16} fontColor={SECONDARY_COLOR} fontWeight='600' />
            </FlexBox>

            <FlexBox
                gap={20}
                flexDirection='row'
                marginVertical={20}
                flexWrap='wrap'
            >
                {firstThreeAmenities.map((amenity, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#e8e7e7",
                            borderWidth: 0.5,
                            borderColor: "#000",
                            borderRadius: 50,
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

        </FlexBox>
    );
};

export default HotelCard;