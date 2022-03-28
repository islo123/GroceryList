import React, { useState } from 'react'
import { api } from "../api/Axios"

export default function UpdateItemList({setData}) {
    const [newListItem, setNewListItem] = useState("")
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
    return (
        <form className='add-form' onSubmit={GetNewListItem}>
            <label>Add a grocery</label>
            <input required type='text' value={newListItem} onChange={(e) => { return setNewListItem(e.target.value)}}/>
            <button type='submit'>Add</button>
        </form>
  )
}
