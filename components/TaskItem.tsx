import { Task } from "@/types";
import { Pressable, Text, View, ViewComponent } from "react-native";
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

type TaskItemProps = {
    task:Task;
    onToggleCompleted: (id:string) => void; //タップしていた時に呼ぶ関数
    onDelete: (id:string) => void; //削除用の関数
};

export default function TaskItem({ task, onToggleCompleted, onDelete} :TaskItemProps) {
    return (
        <View style ={tw`flex-row items-center bg-slate-800 p-4 rounded-lg mb-3`}>
            {/*iscOMPLETEDに応じてスタイルとアイコンを切り替える*/}
            <Pressable
            onPress={()=> onToggleCompleted(task.id)} //タップされたら親から渡された関数を呼び出す
            style={tw.style(
                `w-7 h-7 rounded-full items-center justify-center mr-4 rounded-full border-2 border-gray-400 `,
                task.isCompleted && `bg-gray-400 border-blue-500` //たすくが完了している場合のスタイル
            )}
            >
                {task.isCompleted && (
                    <Ionicons name="checkmark" size={20} color={tw.color('white')} />
                )}
            </Pressable>

            <View style={tw`flex-1`}>
                {/*isCompletedに応じて取り消し線をつける */}
                <Text style={tw.style(
                    `text-white text-lg`,
                    task.isCompleted && 'line-through text-gray-500' //完了時のスタイル
                )}
                >
                    {task.title}
                </Text>
                <Text style={tw`text-gray-400`}>{task.category}</Text>
            </View>

            <Pressable
                onPress={()=> onDelete(task.id)}>
                    <Ionicons name="trash-outline" sze={24} color={tw.color('gray-400')} />
                </Pressable>
        </View>
    );
}