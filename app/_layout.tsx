import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider, useAppContext } from "../contexts/AppContext";
import Toast from "../components/Toast";

// Toast wrapper component to use context
function ToastWrapper() {
  const { currentToast, dismissToast } = useAppContext();

  return currentToast ? (
    <Toast
      message={currentToast.message}
      type={currentToast.type}
      duration={currentToast.duration}
      visible={!!currentToast}
      onDismiss={dismissToast}
    />
  ) : null;
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="store-detail" />
          <Stack.Screen name="vendor" />
        </Stack>
        <ToastWrapper />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
