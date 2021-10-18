import React from "react";

const Sort = ({ userInput, handleOrder, handleChange}) => {


  return(
    <div>
      <form action="#" method="#" className="myForm" name="myForm">
        <label htmlFor="order"></label>
          <select name="order" id="order" onChange={handleOrder}>
            <option value disabled selected>SELECT ORDER</option>
            <option value="1">First Name ASC.</option>
            <option value="2">First Name DESC.</option>
            <option value="3">Last Name ASC.</option>
            <option value="4">Last Name DESC.</option>
          </select>
      </form>

      <form className="search-form">
        <label htmlFor="search"></label>
        <input type="text" className="search" placeholder="search" onChange={handleChange} value={userInput} />
      </form>
    </div>
  )
}

export default Sort;