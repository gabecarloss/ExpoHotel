import { supabaseConfig } from "@/config/supabase-config";
import { IUser } from "@/interfaces";


export const registerUser = async (payload: Partial<IUser>) => {
    try {
        const authResponse = await supabaseConfig.auth.signUp({
            email: payload.email || "",
            password: payload.password || "",
        });

        if (authResponse.error) {
            return {
                success: false,
                message: authResponse.error.message,
            };
        }

        const userId = authResponse.data.user?.id;

        if (!userId) {
            return {
                success: false,
                message: "Failed to retrieve user id from auth",
            };
        }

        const dbResponse = await supabaseConfig.from("user_profiles").insert([
            {
                id: userId,
                name: payload.name,
                role: "customer",
                is_active: true,
                profile_picture: "",
            },
        ]);

        if (dbResponse.error) {
            return {
                success: false,
                message: dbResponse.error.message,
            };
        }

        return {
            success: true,
            message: "User registered successfully!",
        };

    } catch (error) {
        return {
            success: false,
            message: (error as Error).message || "Registration failed!",
        };
    }
};


export const loginUser = async (payload: Partial<IUser>) => {
    try {
        const authResponse = await supabaseConfig.auth.signInWithPassword({
            email: payload.email || "",
            password: payload.password || "",
        });

        if (authResponse.error) {
            return {
                success: false,
                message: authResponse.error.message,
            };
        }

        const userId = authResponse.data.user?.id;

        if (!userId) {
            return {
                success: false,
                message: "Invalid auth session",
            };
        }

        const { data: dbUser, error: dbError } = await supabaseConfig
            .from("user_profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (dbError || !dbUser) {
            return {
                success: false,
                message: "User profile not found",
            };
        }

        if (!dbUser.is_active) {
            return {
                success: false,
                message: "User is inactive",
            };
        }

        return {
            success: true,
            message: "Login successful",
            data: dbUser,
        };

    } catch (error) {
        return {
            success: false,
            message: (error as Error).message || "Login failed",
        };
    }
};


export const getLoggedInUser = async () => {
    try {
        const { data: sessionData, error: sessionError } =
            await supabaseConfig.auth.getSession();

        if (sessionError) {
            return {
                success: false,
                message: sessionError.message,
            };
        }

        const userId = sessionData.session?.user?.id;

        if (!userId) {
            return {
                success: false,
                message: "No authenticated user found",
            };
        }

        const { data: dbUser, error: dbError } = await supabaseConfig
            .from("user_profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (dbError || !dbUser) {
            return {
                success: false,
                message: "User profile not found",
            };
        }

        return {
            success: true,
            message: "Logged in user fetched successfully",
            data: dbUser,
        };

    } catch (error) {
        return {
            success: false,
            message: (error as Error).message || "Failed to fetch logged in user",
        };
    }
};