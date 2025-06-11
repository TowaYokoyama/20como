// app/+not-found.tsx

import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native'; // ViewとTextをreact-nativeからインポート
import tw from 'twrnc'; // twrncをインポート

export default function NotFoundScreen() {
  return (
    <>
      {/* 画面上部のタイトルを設定 */}
      <Stack.Screen options={{ title: 'おっと！' }} />

      <View style={tw`flex-1 items-center justify-center p-5 bg-slate-900`}>
        <Text style={tw`text-2xl font-bold text-white`}>この画面は存在しません。</Text>

        {/* ホーム画面に戻るためのリンク */}
        <Link href="/" style={tw`mt-4 py-3`}>
          <Text style={tw`text-base text-blue-400`}>ホーム画面に戻る</Text>
        </Link>
      </View>
    </>
  );
}