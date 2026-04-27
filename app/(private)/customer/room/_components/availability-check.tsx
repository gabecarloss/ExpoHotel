import { View, Text } from "react-native";
import React from "react";
import { IRoom } from "@/interfaces";
import { DatePickerModal } from 'react-native-paper-dates';
import { FlexBox } from "@/components/flexbox";
import { CustomButton } from "@/components/custom-button";
import dayjs from "dayjs";
import { checkRoomAvailability } from "@/services/bookings";
import { stringify } from "node:querystring";
import { CustomText } from "@/components/custom-text";
import { daySize } from "react-native-paper-dates/lib/typescript/Date/dateUtils";
import { useMemo } from "react";
import { SECONDARY_COLOR } from "@/constants";

export const AvailabilityCheck = ({ room }: { room: IRoom }) => {
    const [openCheckInDate, setOpenCheckInDate] = React.useState(false);
    const [openCheckOutDate, setOpenCheckOutDate] = React.useState(false);
    const [checkInDate, setCheckInDate] = React.useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = React.useState<Date | null>(null);
    const [availabilityResponse, setAvailabilityResponse] = React.useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [makingPayment, setMakingPayment] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const onCheckAvailability = async () => {
        setLoading(true);
        const datesRequired: string[] = [];
        for (
            let date = dayjs(checkInDate).startOf("day");
            date.isBefore(dayjs(checkOutDate).startOf("day"));
            date = date.add(1, "day")
        ) {
            datesRequired.push(dayjs(date).format("YYYY-MM-DD"));
        }

        const roomId = room.id.toString();

        const { success, message, error } = await checkRoomAvailability(
            datesRequired,
            roomId
        );

        if (error) {
            setAvailabilityResponse({ success: false, message: error });
        } else {
            setAvailabilityResponse({ success: true, message: "Slot available" })
        }

        setLoading(false);
    };

    const totalAmount = React.useMemo(() => {
        if (checkInDate && checkOutDate) {
            const days =
                dayjs(checkOutDate)
                    .startOf("day")
                    .diff(dayjs(checkInDate).startOf("day"), "day") || 1;
            return (room.rent_per_day || 0) * days;
        }
        return 0;
    }, [checkInDate, checkOutDate, room.rent_per_day]);

    return (
        <FlexBox
            gap={20}
        >
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <CustomButton onPress={() => setOpenCheckInDate(true)} uppercase={false} mode="outlined">
                    Check-In Date - {" "}
                    {checkInDate ? dayjs(checkInDate).format("DD MMM YYYY") : "(Select)"}
                </CustomButton>

                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={openCheckInDate}
                    onDismiss={() => { setOpenCheckInDate(false) }}
                    date={checkInDate!}
                    onConfirm={({ date }: any) => {
                        setOpenCheckInDate(false);
                        setCheckInDate(date);
                    }}
                />
            </View>

            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <CustomButton onPress={() => setOpenCheckOutDate(true)} uppercase={false} mode="outlined">
                    Check-Out Date - {" "}
                    {checkOutDate ? dayjs(checkOutDate).format("DD MMM YYYY") : "(Select)"}
                </CustomButton>

                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={openCheckOutDate}
                    onDismiss={() => { setOpenCheckOutDate(false) }}
                    date={checkOutDate!}
                    onConfirm={({ date }: any) => {
                        setOpenCheckOutDate(false);
                        setCheckOutDate(date);
                    }}
                />
            </View>

            {availabilityResponse && <FlexBox>
                {availabilityResponse.success ? (
                    <FlexBox
                        style={{
                            backgroundColor: "#089c2d3f",
                            padding: 10,
                            borderRadius: 5,
                        }}
                    >
                        <CustomText
                            value="Room is available for the  selected dates!"
                            fontColor="green"
                        />
                        <CustomText value={`Total amount: $${totalAmount}`} />
                    </FlexBox>
                ) : (
                    <Text style={{ color: "red" }}>{availabilityResponse.message}</Text>
                )}
            </FlexBox>}

            {!availabilityResponse && (
                <CustomButton
                    disabled={!checkInDate || !checkOutDate || loading}
                    onPress={onCheckAvailability}
                >
                    Check Availability
                </CustomButton>
            )}

            {availabilityResponse && availabilityResponse.success &&
                <FlexBox
                    gap={25}
                >
                    <CustomButton
                        disabled={makingPayment}
                        onPress={onCheckAvailability}
                    >
                        Make payment & Book
                    </CustomButton>

                    <CustomButton
                        onPress={() => {
                            setCheckInDate(null);
                            setCheckOutDate(null);
                            setAvailabilityResponse(null);
                        }}
                        mode="outlined"
                    >
                        Reset dates
                    </CustomButton>
                </FlexBox>
            }
        </FlexBox>
    )
}

export default AvailabilityCheck