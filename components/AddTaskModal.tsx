// components/AddTaskModal.tsx

import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (title: string, category: string) => void;
};

export default function AddTaskModal({ visible, onClose, onSave }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title, category);
    setTitle('');
    setCategory('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1 justify-end`}
      >
        <View style={tw`bg-slate-800 p-5 rounded-t-2xl`}>
          <Text style={tw`text-white text-xl font-bold mb-4`}>新しいタスク</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="タスクのタイトルを入力"
            placeholderTextColor={tw.color('gray-500')}
            style={tw`bg-slate-700 text-white p-3 rounded-lg mb-4`}
            autoFocus={true}
          />
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="カテゴリ（例: 天文学）"
            placeholderTextColor={tw.color('gray-500')}
            style={tw`bg-slate-700 text-white p-3 rounded-lg mb-6`}
          />
          <View style={tw`flex-row justify-end`}>
            <Pressable onPress={onClose} style={tw`py-3 px-5 mr-2`}>
              <Text style={tw`text-gray-400`}>キャンセル</Text>
            </Pressable>
            <Pressable onPress={handleSave} style={tw`bg-blue-500 py-3 px-5 rounded-lg`}>
              <Text style={tw`text-white font-bold`}>保存</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}