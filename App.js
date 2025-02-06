import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [focusTime, setFocusTime] = useState(0);

  // 加载存储的专注时间
  useEffect(() => {
    const loadFocusTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem("focusTime");
        if (storedTime !== null) {
          setFocusTime(parseInt(storedTime, 10));
        }
      } catch (error) {
        console.error("Failed to load focus time:", error);
      }
    };
    loadFocusTime();
  }, []);

  // 增加专注时间并存储
  const increaseFocusTime = async () => {
    try {
      const newTime = focusTime + 1;
      setFocusTime(newTime);
      await AsyncStorage.setItem("focusTime", newTime.toString());
    } catch (error) {
      console.error("Failed to save focus time:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Focus Guardian</Text>
      <Text style={styles.text}>专注时间: {focusTime} 分钟</Text>
      <Button title="增加专注时间" onPress={increaseFocusTime} />
      <StatusBar style="auto" />
    </View>
  );
}

// 样式表
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

