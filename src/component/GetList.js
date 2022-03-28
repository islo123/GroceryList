import React, { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
import { api } from "../api/Axios"

export default function GetList({data, setData}) {

    const [updatedText, setUpdatedText] = useState("")

    const deleteGrocery = async function(_id){
        await api.delete(`/${_id}`)
        const filter = data.filter(function(item){
        return item._id !== _id
        })
        setData(filter)
      }
    
      const updateListItem = async function(_id, isEdited){
        let res = await api.put(`/${_id}`, { name: updatedText, isEdited: !isEdited})
        if(updatedText){
          setData(() => {
            return [...data, res.data]
          })    }
        setUpdatedText("")
      }
    
      const changeEdit = async (_id, isEdited) => {
        let res = await api.patch(`/${_id}`, {isEdited: !isEdited})
        setData(() => {
          return [...data, res.data]
        })
      }

  return (
    <div>
        {data.map((item, index) => {
            return (
            <div key={index} className="item-list">
                <h3 id='name' className='name'>{item.name}</h3>
                <div>
                {
                    item.isEdited ? <form onSubmit={(e) => e.preventDefault()}>
                    <input required type='text' value={updatedText} onChange={(e) => setUpdatedText(e.target.value)}/>
                    <button type='submit' onClick={() => { return updateListItem(item._id, item.isEdited)}} className='done-btn'>Done</button></form>: <button className='edit-btn' onClick={() => { return changeEdit(item._id, item.isEdited)}}>Edit <FaEdit/></button>
                }
                </div>
                <div>
                <button className='delete-btn' id="delete-btn" onClick={() => {return deleteGrocery(item._id)}}>Delete <FaTrashAlt/></button>
                </div>
            </div>
            )
        })
      }
    </div>
  )
}
