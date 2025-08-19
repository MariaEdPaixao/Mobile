import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../services/FirebaseConfig"
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen() {
  // Estados para armazenar os valores digitados
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');

  const router = useRouter() //Hook para navegação 

  // Função para simular o envio do formulário
  const handleAlterarSenha = () => {
    if (!novaSenha || !confirmarSenha || !senhaAtual) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

   // Verifica se a nova senha é igual a confirmação da senha
    if(novaSenha !== confirmarSenha){
        Alert.alert("Erro", "As senhas não coincidem!")
    }

    // Tratamento do tamnho da senha se for menor que 6 caracteres
    if(novaSenha.length<6){
        Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres")
    }

    try{
        const user = auth.currentUser;
        if(!user || !user.email){
            Alert.alert("Erro", "Nenhum usuário logado. ")
            return
        }
    }catch(error){
        console.log("Erro!")
    }
    // Atualização da senha no Firebase Auth
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      {/* Campo Nome */}
      <TextInput
        style={styles.input}
        placeholder="Digite a senha atual"
        placeholderTextColor="#aaa"
        value={senhaAtual}
        secureTextEntry
        onChangeText={setSenhaAtual}
      />

      {/* Campo Email */}
      <TextInput
        style={styles.input}
        placeholder="Digite a nova senha"
        placeholderTextColor="#aaa"
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      {/* Campo Senha */}
      <TextInput
        style={styles.input}
        placeholder="Confirme a nova senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {/* Botão */}
      <TouchableOpacity style={styles.botao} onPress={handleAlterarSenha}>
        <Text style={styles.textoBotao}>Alterar a senha</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botao: {
    backgroundColor: '#00B37E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
