import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { api } from "./api/Axios";
import { FaSyncAlt } from "react-icons/fa";
import Header from './component/Header';
import GetList from './component/GetList';
import UpdateItemList from './component/UpdateItemList';
import DeleteAll from './component/DeleteAll';

function App() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [checkIfSure, setCheckIfSure] = useState(false);

  const onPageOpenGetList = async function (){     
      api.get("/").then(function(res){
      setData(res.data.lists)
      setIsLoading(false)
    }).catch(function(error){
    console.log(error)
    })
  }

    useEffect(() => {
      onPageOpenGetList()
      scrollDown()
    }, [JSON.stringify(data), checkIfSure])

  const scrollDown = () => { 
    if(checkIfSure) {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }
  

  if(isLoading){
    return (
      <div className='loading'><FaSyncAlt className='rotate-loading'/><div>Loading...</div></div>
    )
  }
  return (
    <div className="App">
      <Header/>
      {data.length === 0? <h3 className='no-grocery' style={{marginLeft: "3rem", borderBottom: "solid 2px black"}}>There is no grocery</h3> : <GetList data={data} setData={setData}/>}
      <div className='add-items'>
        <div>
          <h3 style={{color: "ButtonShadow"}}>{data.length === 0 ? "No grocery item" : ( data.length === 1  ? data.length +  " item" : data.length + " items" )}</h3>
        </div>
        <UpdateItemList setData={setData}/>
      </div>
      <DeleteAll checkIfSure={checkIfSure} setCheckIfSure={setCheckIfSure} setData={setData}/>
    </div>
  );
}

export default App;
