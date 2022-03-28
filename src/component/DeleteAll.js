import React from 'react'
import { api } from "../api/Axios"

export default function DeleteAll({setData, checkIfSure, setCheckIfSure}) {

    const deleteAll = async () => {
        let res = await api.delete("/")
        setData(() => {
          return [res.data]
        })
        setCheckIfSure(false)
      }
    
    return (
        <div style={{textAlign: "center"}}>
            {
            checkIfSure ? <div style={{backgroundColor: "red", border: "solid 4px orangered", borderRadius: "4px"}}><h3>Are you sure you want do delete all grocries</h3><button onClick={deleteAll} className="yes-btn">Yes</button><button onClick={() => {return setCheckIfSure(false)}} className="no-btn">No</button></div> : <button className='delete-all-btn' onClick={() => {setCheckIfSure(true)}}>Delete All</button>
            }
        </div>
  )
}
