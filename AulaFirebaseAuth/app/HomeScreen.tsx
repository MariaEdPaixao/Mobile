import { Text, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import {auth} from "../services/FirebaseConfig"
import {deleteUser} from "firebase/auth";

export default function HomeScreen(){
    const router = useRouter() // hook de navegação entre telas

    const realizarLogoff = async () => {
        await AsyncStorage.removeItem('@user')
        router.push("/")
    }
    
    // [] -> configurar os btns
    const excluirConta = () => {
        Alert.alert(
            "Cofirmar exclusão",
            "Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita",
            [
                {text: 'Cancelar', style: 'cancel'},
                {text: 'Excluir', style: 'destructive',
                    onPress: async () => {
                        try{
                            const user = auth.currentUser //pegando o user atual
                            if(user){
                                await deleteUser(user) // apaga do firebase auth
                                await AsyncStorage.removeItem('@user') // limpando o async storage
                                Alert.alert("Conta excluída", "Sua conta foi excluida com sucesso!")
                                router.replace("/")
                            }else{
                                Alert.alert("Erro", "Nenhum usuário logado.")
                            }
                        }catch(error){
                            console.log("Erro ao excluir a conta: " +error)
                            Alert.alert("Erro", "Não foi possível excluir a conta")
                        }
                    }
                }
            ]
        )
    }
    
    return(
        <SafeAreaView>
            <Text>Seja bem-vindo a Tela inicial da aplicação</Text>
            <Button title="Sair da conta" onPress={realizarLogoff}/>
            <Button title="Excluir conta" color='red' onPress={excluirConta}/>
            <Text>oiii</Text>
            <Button title="Alterar a senha" onPress={() => {router.push("/AlterarSenha")}}/>
        </SafeAreaView>
    )
}