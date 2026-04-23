import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { FlexBox } from '@/components/flexbox';
import TabTitle from './tab-title';
import { IHotel } from '@/interfaces';
import { fetchActiveHotels } from '@/services/hotels';
import { CustomText } from '@/components/custom-text';
import { FlatList } from 'react-native';
import HotelCard from './hotel-card';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants';

export const Hotels = () => {
    const [hotels, setHotels] = React.useState<IHotel[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const fetchHotels = async () => {
        setLoading(true);
        const response = await fetchActiveHotels();
        setLoading(false);
        if (response.success) {
            setHotels(response.data);
        } else {
            setHotels([]);
        };
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    return (
        <FlexBox
            padding={20}
            backgroundColor={SECONDARY_COLOR}
        >
            <TabTitle
                title="Hotels"
                caption='Browse and book from a variety of hotels.'
            />

            {loading && (
                <FlexBox
                    paddingHorizontal={30}
                >
                    <CustomText
                        value="Loading hotels..."
                    />
                </FlexBox>
            )}

            {!loading && hotels.length === 0 && (
                <FlexBox
                    paddingHorizontal={20}
                >
                    <CustomText
                        value="No hotels avaible at the moment."
                    />
                </FlexBox>
            )}

            {!loading && hotels.length > 0 && (
                <FlatList
                    data={hotels}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <HotelCard hotel={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100, marginTop: 20 }}
                />
            )}

        </FlexBox>
    );
};

export default Hotels;