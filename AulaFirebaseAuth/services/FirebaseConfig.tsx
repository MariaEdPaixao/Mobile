import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Vai permititir que seja realizado o getReactNativePersistense mesmo sem tipagem
const { getReactNativePersistence  } = require("firebase/auth") as any;

// constante com as infos do meu projeto
const firebaseConfig = {
  apiKey: "AIzaSyBGUSMAesUdAtUSze-Xew89p1Fcu7nsLpE",
  authDomain: "aulafirebaseauth-67454.firebaseapp.com",
  projectId: "aulafirebaseauth-67454",
  storageBucket: "aulafirebaseauth-67454.firebasestorage.app",
  messagingSenderId: "650649669555",
  appId: "1:650649669555:web:ebaafb6e6a41b156c0c5c6"
};

// constante que inicializa o app com as configs do projeto no firebase
const app = initializeApp(firebaseConfig);

// exporto a autenticação que já tem as inicializações do app
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence (AsyncStorage)
});

export { auth };
