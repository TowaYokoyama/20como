// app/(tabs)/index.tsx

import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc'; // twrncをインポート

import Header from '../../components/header';

export default function Index() {
  return (
    <View style={tw`flex-1 bg-slate-900`}>
      <Header />

      <View style={tw`flex-1 p-5`}>
         <Text style={tw`text-white text-lg`}>ここにタスクが表示されます</Text>
      </View>

      <StatusBar style="light" />
    </View>
  );
}