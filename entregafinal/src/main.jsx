
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import {initializeApp} from "firebase/app";
import App from './App.jsx'


import  Collection  from './Collection.jsx';

const firebaseConfig = {
  apiKey: "AIzaSyDttuaj32J78UXpgqbSzvKe2GeedPG2E7s",
  authDomain: "reactjs-lukagarcia.firebaseapp.com",
  projectId: "reactjs-lukagarcia",
  storageBucket: "reactjs-lukagarcia.firebasestorage.app",
  messagingSenderId: "881007624858",
  appId: "1:881007624858:web:a86292ba6c897254229523"
};


initializeApp(firebaseConfig);
createRoot(document.getElementById('root')).render(
  <>
    <App/>
    <Collection/>
    
  </>,
)
