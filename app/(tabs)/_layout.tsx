import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import tw from 'twrnc'; // twrncをインポート

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tw.color('blue-500'), // アクティブな時の色
        tabBarStyle: {
          backgroundColor: tw.color('slate-800')?.toString(), // 背景色
          borderTopColor: tw.color('slate-700')?.toString(), // 上の境界線
        },
        headerShown: false, // 各画面のヘッダーは自作するので不要
      }}>
      {/* "index"（タスク一覧）のタブだけを残す */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'タスク',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check-square" color={color} />,
        }}
      />
      {/* "two"のスクリーンはここから削除しました */}
    </Tabs>
  );
}