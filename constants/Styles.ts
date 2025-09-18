import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  screenHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginVertical: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.secondary,
  },
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    color: Colors.light.text,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
  },
});
