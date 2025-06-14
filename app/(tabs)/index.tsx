// app/(tabs)/index.tsx

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

import { Task } from '../../types';
import Header from '../../components/header';
import TaskItem from '../../components/TaskItem';
import AddTaskModal from '../../components/AddTaskModal';
import { onAuthStateChanged, signInAnonymously, updateCurrentUser, User } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot, snapshotEqual } from 'firebase/firestore';


export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user,setUser] = useState<User | null >(null);


  //匿名サインイン
  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if ( currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth).catch((error) => {
          Alert.alert('サインインエラー',error);
        });
      }
    });
    return () => unsubscribe();
  },[]);


  //リアルタイムでタスクを読み込むuseEffect

  useEffect(()=> {
    //ユーザーがサインするまで待つ
    if(!user)return;

    //どのデータを取得するか,というクエリを定義
    //'users/{ユーザーID}/tasks'のデータを、'createdAt'の降順で取得
    const q = query(collection(db, 'users', user.uid, 'tasks'), orderBy('createdAt', 'desc'));

    //onSnapshhotで、データベースの変更をリッスン、監視する
    const unsubscribe = onSnapshot(q, (QuerySnapshot)=> {
      const taskData: Task[] = [];
      QuerySnapshot.forEach((doc)=> {
        //ドキュメントのデータをTask方に直して、配列に変換
        taskData.push({ id: doc.id, ...doc.data()} as Task);
      });
      //取得したタスクデータをstateで更新 -> 画面が再描画される
      setTasks(taskData);
    });
    //この画面が非表示にされたら、リッスンを停止する
    return () => unsubscribe();
  },[user]); //userは確定したら,このuseEffectを実行する

  const handleToggleComplete = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  };
  
  const handleDeleteTask = (id: string) => {
    Alert.alert('タスクを削除', '本当に削除しますか？', [
      { text: 'キャンセル' },
      { text: '削除', onPress: () => setTasks(tasks.filter(t => t.id !== id)) }
    ]);
  };

  const handleAddTask = (title: string, category: string) => {
     const newTask: Task = {
      id: Date.now().toString(),
      title,
      category: category.trim() || '未分類',
      isCompleted: false,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    setIsModalVisible(false);
  }

  return (
    <>
      <View style={tw`flex-1 bg-slate-900`}>
        <Header />
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          )}
          contentContainerStyle={tw`p-5`}
          ListHeaderComponent={<Text style={tw`text-white text-2xl font-bold mb-4`}>今日</Text>}
        />
        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={tw`absolute bottom-8 right-5 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg`}>
          <Ionicons name="add" size={32} color="white" />
        </Pressable>
      </View>
      <AddTaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddTask}
      />
      <StatusBar style="light" />
    </>
  );
}