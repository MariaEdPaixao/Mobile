import { StyleSheet, Text, Button, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { auth } from "../services/FirebaseConfig";
import { deleteUser } from "firebase/auth";
import ItemLoja from "../components/ItemLoja";
import { useState } from "react";
import { collection, addDoc, db } from "../services/FirebaseConfig";

export default function HomeScreen() {
  const router = useRouter(); // hook de navegação entre telas
  const [title, setTitle] = useState("");

  const realizarLogoff = async () => {
    await AsyncStorage.removeItem("@user");
    router.push("/");
  };

  // [] -> configurar os btns
  const excluirConta = () => {
    Alert.alert(
      "Cofirmar exclusão",
      "Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser; //pegando o user atual
              if (user) {
                await deleteUser(user); // apaga do firebase auth
                await AsyncStorage.removeItem("@user"); // limpando o async storage
                Alert.alert(
                  "Conta excluída",
                  "Sua conta foi excluida com sucesso!"
                );
                router.replace("/");
              } else {
                Alert.alert("Erro", "Nenhum usuário logado.");
              }
            } catch (error) {
              console.log("Erro ao excluir a conta: " + error);
              Alert.alert("Erro", "Não foi possível excluir a conta");
            }
          },
        },
      ]
    );
  };

  const salvarItem = async () => {
    try {
      // quando eu nao tenho essa coleção no bd ele cria automaticamente
      const docRef = await addDoc(collection(db, "items"), {
        title: title,
        isChecked: false,
      });
      Alert.alert("Sucesso", "Produto salvo com sucesso!")
      console.log("Documento salvo ", docRef.id)
      setTitle('') //Limpa o TextInput
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Seja bem-vindo a Tela inicial da aplicação</Text>
      <Button title="Sair da conta" onPress={realizarLogoff} />
      <Button title="Excluir conta" color="red" onPress={excluirConta} />
      <Button
        title="Alterar a senha"
        onPress={() => {
          router.push("/AlterarSenha");
        }}
      />
      <ItemLoja />
      <ItemLoja />
      <ItemLoja />
      <TextInput
        placeholder="Digite o nome do produto"
        style={styles.input}
        value={title}
        onChangeText={(value) => setTitle(value)}
        onSubmitEditing={salvarItem} //quando clica no enter do celular ele chama a função
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 15,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
  },
});
