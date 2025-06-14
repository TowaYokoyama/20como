// components/TaskItem.tsx

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types';

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  return (
    <View style={tw`flex-row items-center bg-slate-800 p-4 rounded-lg mb-3`}>
      <Pressable
        onPress={() => onToggleComplete(task.id)}
        style={tw.style(
          `w-7 h-7 rounded-full border-2 border-gray-400 mr-4 items-center justify-center`,
          task.isCompleted && `bg-blue-500 border-blue-500`
        )}
      >
        {task.isCompleted && (
          <Ionicons name="checkmark" size={20} color={tw.color('white')} />
        )}
      </Pressable>
      <View style={tw`flex-1`}>
        <Text
          style={tw.style(
            `text-white text-lg`,
            task.isCompleted && `line-through text-gray-500`
          )}
        >
          {task.title}
        </Text>
        <Text style={tw`text-gray-400`}>{task.category}</Text>
      </View>
      <Pressable onPress={() => onDelete(task.id)}>
        <Ionicons name="trash-outline" size={24} color={tw.color('gray-400')} />
      </Pressable>
    </View>
  );
}