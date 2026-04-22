import { supabaseConfig } from "@/config/supabase-config";
import { IUser } from "@/interfaces";

export const registerUser = async (payload: Partial<IUser>) => {
    try {
        const { data: authData, error: authError } =
            await supabaseConfig.auth.signUp({
                email: payload.email || "",
                password: payload.password || "",
                options: {
                    data: {
                        name: payload.name,
                    },
                },
            });

        if (authError) {
            return {
                success: false,
                message: authError.message,
            };
        }

        if (!authData.user?.id) {
            return {
                success: false,
                message: "Failed to retrieve user id from auth",
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
        const { data: authData, error: authError } =
            await supabaseConfig.auth.signInWithPassword({
                email: payload.email || "",
                password: payload.password || "",
            });

        if (authError) {
            return {
                success: false,
                message: authError.message,
            };
        }

        const userId = authData.user?.id;

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
        const { data, error } =
            await supabaseConfig.auth.getSession();

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        const userId = data.session?.user?.id;

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
            data: dbUser,
        };

    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
        };
    }
};