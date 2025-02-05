import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppState } from '@react-native-community/hooks';

const FocusGuardian = () => {
  const [unlockReason, setUnlockReason] = useState('');
  const [log, setLog] = useState([]);
  const appState = useAppState();

  useEffect(() => {
    if (appState === 'active') {
      promptUser();
    }
  }, [appState]);

  const promptUser = async () => {
    Alert.alert(
      '你为什么解锁手机？',
      '请输入你的解锁目的',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: async () => {
            if (unlockReason.trim() !== '') {
              await saveUnlockReason(unlockReason);
              setUnlockReason('');
            }
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const saveUnlockReason = async (reason) => {
    try {
      const currentLog = await AsyncStorage.getItem('unlockLog');
      const updatedLog = currentLog ? JSON.parse(currentLog) : [];
      updatedLog.push({ reason, timestamp: new Date().toISOString() });
      await AsyncStorage.setItem('unlockLog', JSON.stringify(updatedLog));
      setLog(updatedLog);
    } catch (error) {
      console.error('存储失败', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Focus Guardian</Text>
      <TextInput
        placeholder='输入解锁目的'
        value={unlockReason}
        onChangeText={setUnlockReason}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <Button title='记录' onPress={() => saveUnlockReason(unlockReason)} />
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>解锁记录：</Text>
        {log.map((entry, index) => (
          <Text key={index}>{entry.timestamp}: {entry.reason}</Text>
        ))}
      </View>
    </View>
  );
};

export default FocusGuardian;

// GitHub Actions 配置将在 .github/workflows 目录下添加
