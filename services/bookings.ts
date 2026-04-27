import { supabaseConfig } from "@/config/supabase-config";

export const checkRoomAvailability = async (
    datesRequired: string[],
    roomId: string,
) => {
    try{
        const { data: bookings, error } = await supabaseConfig
            .from("bookings")
            .select("*")
            .overlaps("booked_dates", datesRequired)
            .neq("status", "cancelled")
            .eq("room_id", roomId);

        if (error) {
            throw new Error(error.message);
        }

        if (bookings && bookings.length > 0) {
            return { success: false, message:"Room is not available for the selected dates."};
        }

        return{ 
            succces: true,
            message:"Room is available for the selected dates!",
        }
    } catch (error: any){
        return { success: false, error: error.message};
    }
};