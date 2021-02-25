import { Button } from '@material-ui/core';
import React from 'react'
import {useLocation} from 'react-router-dom'



const Header = ({ title,onAdd,showAdd }) => {
      const location=useLocation()  
    
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname==="/" && <button className="btn" color={showAdd ? 'red' : 'steelblue'} onClick={onAdd}  >{showAdd ? 'CLOSE' : '+'}</button>}
            
        </header>
        
    );
    
}


Header.defaultProps ={
    title:'Task Tracker'
  }
export default Header
