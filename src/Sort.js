import React from "react";

const Sort = ({ userInput, handleOrder, handleChange}) => {


  return(
    <div className="sort">
      <form className="searchbar-form">
        <label htmlFor="search"></label>
        <input className="searchbar-input" type="text" placeholder="Search Name..." onChange={handleChange} value={userInput} />
      </form>

      <form action="#" method="#" className="search-form" name="myForm">
        <label htmlFor="order"></label>
          <select className="search-select" name="order" id="order" onChange={handleOrder}>
            <option value disabled selected>SELECT ORDER</option>
            <option value="1">First Name ASC.</option>
            <option value="2">First Name DESC.</option>
            <option value="3">Last Name ASC.</option>
            <option value="4">Last Name DESC.</option>
          </select>
      </form>

    </div>
  )
}

export default Sort;