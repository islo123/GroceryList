import React from 'react'
import GroceryImg from "../grocery.jpg"

export default function Header() {
  return (
    <header>
        <img src={GroceryImg}/>
        <h3>Grocery List</h3>
    </header>
  )
}
