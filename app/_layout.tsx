import { PaperProvider, MD3LightTheme as DefaultTheme,} from "react-native-paper";
import { Stack } from "expo-router";
import { ACCENT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from "@/constants";

export default function Layout() {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary : PRIMARY_COLOR
    }
  }

  return (
    <PaperProvider
      theme = {theme}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
