import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [focusMode, setFocusMode] = React.useState(false);

  // 切换专注模式
  const toggleFocusMode = async () => {
    const newFocusMode = !focusMode;
    setFocusMode(newFocusMode);
    await AsyncStorage.setItem("focusMode", JSON.stringify(newFocusMode));
  };

  // 读取存储的专注模式状态
  React.useEffect(() => {
    const loadFocusMode = async () => {
      const storedMode = await AsyncStorage.getItem("focusMode");
      if (storedMode !== null) {
        setFocusMode(JSON.parse(storedMode));
      }
    };
    loadFocusMode();
  }, []);

  return (
    <View style={[styles.container, focusMode ? styles.focusMode : null]}>
      <Text style={styles.title}>Focus Guardian</Text>
      <Text style={styles.subtitle}>
        {focusMode ? "🔒 专注模式已开启" : "🔓 专注模式已关闭"}
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggleFocusMode}>
        <Text style={styles.buttonText}>
          {focusMode ? "关闭专注模式" : "开启专注模式"}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

// 样式表
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  focusMode: {
    backgroundColor: "#1E1E1E", // 专注模式黑色背景
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
