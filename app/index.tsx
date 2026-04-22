import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabaseConfig } from "@/config/supabase-config";
import { useUsersStore } from "@/store/users-store";
import { FlexBox } from "../components/flexbox";
import { CustomText } from "../components/custom-text";

type Role = "customer" | "owner" | "admin";

const Index = () => {
    const router = useRouter();
    const { setUser } = useUsersStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProfile = async (userId: string) => {
            const { data: profile } = await supabaseConfig
                .from("user_profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (!profile) {
                router.replace("/(public)/login");
                return;
            }

            setUser(profile);

            const routes: Record<Role, string> = {
                customer: "/customer/home",
                owner: "/owner/home",
                admin: "/admin/home",
            };

            router.replace(routes[profile.role as Role] as any);
        };

        const bootstrap = async () => {
            const { data } = await supabaseConfig.auth.getSession();

            const session = data.session;

            if (!session?.user) {
                setLoading(false);
                router.replace("/(public)/login");
                return;
            }

            await loadProfile(session.user.id);
            setLoading(false);
        };

        bootstrap();

        const { data: listener } =
            supabaseConfig.auth.onAuthStateChange((_event, session) => {

                if (!session?.user) {
                    setUser(null);
                    router.replace("/(public)/login");
                    return;
                }

                loadProfile(session.user.id);
            });

        return () => listener.subscription.unsubscribe();

    }, []);

    if (loading) {
        return (
            <FlexBox flex={1} justifyContent="center" alignItems="center">
                <CustomText value="Loading session..." />
            </FlexBox>
        );
    }

    return null;
};

export default Index;