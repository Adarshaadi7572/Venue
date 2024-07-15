import './App.css'
import Header from './Components/Header';
import Main from './Components/Main';
import {useState} from 'react';
export default function App() {
    const [search , setSearch] = useState("");
  return (
    <div>
      <Header setSearch={setSearch}/>
      <Main search={search}/>
    </div>
  )
}
