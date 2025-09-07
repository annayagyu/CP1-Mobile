import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveUser } from '../services/AsyncStorageService';

export default function UserFormScreen({ navigation, route }) {
  const userToEdit = route.params?.user;
  const [nome, setNome] = useState(userToEdit?.nome || '');
  const [email, setEmail] = useState(userToEdit?.email || '');
  const [urlAvatar, setUrlAvatar] = useState(userToEdit?.urlAvatar || '');

  // Função para validar formato de e-mail
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = async () => {
    // Validação dos campos
    if (!nome || !email || !urlAvatar) {
      Alert.alert("Ops!", "Todos os campos devem ser preenchidos!");
      return;
    }

    // Validação do e-mail
    if (!validateEmail(email)) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido, por favor.");
      return;
    }

    const newUser = {
      id: userToEdit?.id,
      nome,
      email,
      urlAvatar,
    };

    await saveUser(newUser);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Informe o Nome"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Informe o E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>URL do Avatar</Text>
      <TextInput
        style={styles.input}
        value={urlAvatar}
        onChangeText={setUrlAvatar}
        placeholder="Informe a URL do Avatar"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: '#ed145b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
