import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import React from 'react';
import { FaTrashAlt, FaSyncAlt } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
function App() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newListItem, setNewListItem] = useState("")
  const [updatedText, setUpdatedText] = useState("")
  const [checkIfSure, setCheckIfSure] = useState(false)

  const api = axios.create({
    baseURL: "https://morning-hollows-76146.herokuapp.com/list"
  })

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
      //scrollDown()
    }, [JSON.stringify(data)])

  const GetNewListItem = async function(e){
    e.preventDefault()
    let res = await api.post("/", {name: newListItem})
    if(newListItem){
        setData(function(data){
        return [...data, res.data]
    }) 
    setNewListItem("")
    }
  }
    
  const deleteGrocery = async function(_id){
    await api.delete(`/${_id}`)
    const filter = data.filter(function(item){
    return item._id !== _id
    })
    setData(filter)
  }

  const updateListItem = async function(_id, isEdited){
    let res = await api.patch(`/${_id}`, {name: updatedText, isEdited: !isEdited})
    if(updatedText){
      setData(function(){
        return [...data, res.data]
      })
    }
    setUpdatedText("")
    
  }

  const changeEdit = async (_id, isEdited) => {
    let res = await api.patch(`/${_id}`, {isEdited: !isEdited})
    setData(() => {
      return [...data, res.data]
    })
  }

  const deleteAll = async () => {
    let res = await api.delete("/")
    setData(() => {
      return [res.data]
    })
    setCheckIfSure(false)
  }

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
      <h3>Grocery List</h3>
      {data.length === 0? <h3 className='no-grocery' style={{marginLeft: "3rem", borderBottom: "solid 2px black"}}>There is no grocery</h3> : 
      data.map((item, index) => {
        return (
          <div key={index} className="item-list">
            <h3 id='name' className='name'>{item.name}</h3>
            <div>
              {
                item.isEdited ? <form onSubmit={() => { return updateListItem(item._id, item.isEdited)}}>
                <input required type='text' value={updatedText} onChange={(e) => {return setUpdatedText(e.target.value)}}/>
                <button className='done-btn'>Done</button></form>: <button className='edit-btn' onClick={() => { return changeEdit(item._id, item.isEdited)}}>Edit <FaEdit/></button>
              }
            </div>
            <div>
              <button className='delete-btn' id="delete-btn" onClick={() => {return deleteGrocery(item._id)}}>Delete <FaTrashAlt/></button>
            </div>
          </div>
        )
      })
      }
      <div className='add-items'>
        <div>
          <h3 style={{color: "ButtonShadow"}}>{data.length === 0 ? "No grocery item" : ( data.length === 1  ? data.length +  " item" : data.length + " items" )}</h3>
        </div>
        <form className='add-form' onSubmit={GetNewListItem}>
            <label>Add a grocery</label>
            <input required type='text' value={newListItem} onChange={(e) => { return setNewListItem(e.target.value)}}/>
            <button type='submit'>Add</button>
        </form>
      </div>
      <div style={{textAlign: "center"}}>
        {
          checkIfSure ? <div style={{backgroundColor: "red", border: "solid 4px orangered", borderRadius: "4px"}}><h3>Are you sure you want do delete all grocries</h3><button onClick={deleteAll} className="yes-btn">Yes</button><button onClick={() => {return setCheckIfSure(false)}} className="no-btn">No</button></div> : <button className='delete-all-btn' onClick={() => {setCheckIfSure(true)}}>Delete All</button>
        }
      </div>
    </div>
  );
}

export default App;
