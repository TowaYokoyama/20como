import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View } from "react-native";
import tw from 'twrnc';

type AddtaskModalProps = {
    visible:boolean;
    onClose:()=> void; //モーダルを閉じるためのpropsの型定義
    onSave:(title:string)=> void; 
};

export default function AddTaskModal({ visible, onClose,onSave}: AddtaskModalProps) {
    //入力されたタスクのタイトルを管理るstate
    const [title,setTitle] = useState("");

    const handleSave = () => {
        if (!title.trim()) return; //からの場合は保存しない
        onSave(title); 
        setTitle(""); //保存後は入力欄を空にする
           };

           return (
            <Modal
            visible={visible}
            animationType="slide"//下から上にステージインするアニメーション
            transparent={true}//背景を透過させる
            onRequestClose={onClose}
            >
                {/*KeyboardAvoidViewはキーボード表示時にフォームが隠れないようにするおまじない */}
                <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={tw`flex-1 justify-end`}
                >
                    <View
                    style={tw`{bg-slate-800 p-5 rounded-t-2xl}`}>
                        <Text style={tw`text-white text-xl font-bold mb-4`}>新しいタスク</Text>
                        <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="タスクのタイトルを入力"
                        placeholderTextColor={tw.color('gray-500')}
                        style={tw`bg-slate-700 texst-white p-3 rounded-lg mb-4`}
                        autoFocus={true} //モーダル表示時に自動でフォーカスする
                        />
                        <View style={tw`flex-row justify-end`}>
                            <Pressable onPress={onClose} style={tw`py-3 px-5 mr-2`}>
                                <Text style={tw`text-gray-400`}>キャンセル</Text>
                            </Pressable>
                            <Pressable onPress={handleSave} style={tw`bg-blue-500 oy-3 px-5 rounded-lg`}>
                                <Text style={tw`text-white font-bold`}>保存</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
           );
};