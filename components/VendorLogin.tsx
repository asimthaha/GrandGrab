import { Colors } from "@/constants/Colors";
import { mockVendorProfiles, VendorProfile } from "@/constants/MockData";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface VendorLoginProps {
  onLogin: (vendor: VendorProfile) => void;
}

const VendorLogin: React.FC<VendorLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setIsLoading(true);

    // Simulate API call with 1.5s delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const vendor = mockVendorProfiles.find(
      (v) => v.username === username.trim() && v.password === password.trim()
    );

    setIsLoading(false);

    if (vendor) {
      onLogin(vendor);
    } else {
      Alert.alert("Login Failed", "Invalid username or password");
    }
  };

  const demoAccounts = [
    {
      username: "goldencrust",
      password: "baker123",
      business: "Golden Crust Bakery (Premium)",
    },
    {
      username: "freshmarket",
      password: "fresh456",
      business: "Fresh Market Co. (Free)",
    },
    {
      username: "bellas",
      password: "italian789",
      business: "Bella's Italian Kitchen (Premium)",
    },
    {
      username: "morningbrew",
      password: "coffee000",
      business: "Morning Brew Cafe (Free)",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Vendor Portal</Text>
        <Text style={styles.subtitle}>Surprise Bag Management</Text>
      </View>

      <View style={styles.loginForm}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor={Colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor={Colors.textSecondary}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.loginButtonText,
              isLoading && styles.loginButtonTextDisabled,
            ]}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demoSection}>
        <Text style={styles.demoTitle}>Demo Accounts</Text>
        <Text style={styles.demoSubtitle}>Click to auto-fill credentials</Text>
        {demoAccounts.map((account, index) => (
          <TouchableOpacity
            key={index}
            style={styles.demoAccount}
            onPress={() => {
              setUsername(account.username);
              setPassword(account.password);
            }}
          >
            <Text style={styles.demoAccountText}>{account.business}</Text>
            <Text style={styles.demoCredentials}>
              {account.username} / {account.password}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  loginForm: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.background,
    color: Colors.text,
  },
  loginButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
  loginButtonTextDisabled: {
    opacity: 0.8,
  },
  demoSection: {
    marginTop: 20,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  demoSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  demoAccount: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  demoAccountText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  demoCredentials: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
});

export default VendorLogin;
