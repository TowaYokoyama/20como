// app/(tabs)/index.tsx

import React, { useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

import { Task } from '../../types'; // 型定義をインポート

// コンポーネントをインポート
import Header from '../../components/header';
import TaskItem from '../../components/TaskItem';

// 仮のデータ（モックデータ）
const MOCK_TASKS: Task[] = [
  { id: '1', title: '夜空を観察する', category: '天文学', isCompleted: false },
  { id: '2', title: '星座について読む', category: '天文学', isCompleted: true },
  { id: '3', title: 'プラネタリウムを訪れる', category: '天文学', isCompleted: false },
  { id: '4', title: '宇宙講演会に参加する', category: '天文学', isCompleted: false },
];

export default function Index() {
  // tasksのリストをstateとして管理
  const [tasks, setTasks] = useState(MOCK_TASKS);

  // タスクの完了・未完了を切り替える関数
  const handleToggleComplete = (id: string) => {
    // 元の配列を元に、新しい配列をmapで作成
    const newTasks = tasks.map((task) => {
      // idが一致するタスクだけ、isCompletedを反転させる
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    // 作成した新しい配列でstateを更新
    setTasks(newTasks);
  };

  // タスクを削除する関数（今回はアラート表示のみ）
  const handleDeleteTask = (id: string) => {
    Alert.alert('削除機能', 'これは次のステップで実装します！');
  };

  return (
    <View style={tw`flex-1 bg-slate-900`}>
      <Header />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            // 作成した関数をTaskItemに渡す
            onToggleCompleted={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        )}
        contentContainerStyle={tw`p-5`}
        ListHeaderComponent={<Text style={tw`text-white text-2xl font-bold mb-4`}>今日</Text>}
      />

      <StatusBar style="light" />
    </View>
  );
}