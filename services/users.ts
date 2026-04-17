import { supabaseConfig } from "@/config/supabase-config";
import { IUser } from "@/interfaces"

export const registerUser = async (payload: Partial<IUser>) => {

    try {
        const authResponse = await supabaseConfig.auth.signUp({
            email: payload.email || "",
            password: payload.password || "",
        });
        if (authResponse.error) {
            throw authResponse.error;
        };

        const dbResponse = await supabaseConfig.from("user_profiles").insert([
            {
            name: payload.name,
                email: payload.email,
                    role: payload.role || "customer",
                        is_active: true,
                            profile_picture: "",
            },
        ]);
        if (dbResponse.error) {
            throw dbResponse.error;
        }
        return {
            sucess: true,
            message: "User registeder successfully!"
        }

    } catch (error) {
    return {
        sucess: false,
        message: (error as Error).message || "Registration failed!",
    };
}

}