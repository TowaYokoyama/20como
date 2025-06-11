// components/Header.tsx

import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc'; // twrncをインポート

export default function Header() {
  return (
    // Tailwind CSSのクラス名を直接書いていく
    <View style={tw`w-full pt-14 pb-4 px-5 bg-slate-800`}>
      <Text style={tw`text-white text-center text-3xl font-bold`}>タスクリスト</Text>
    </View>
  );
}