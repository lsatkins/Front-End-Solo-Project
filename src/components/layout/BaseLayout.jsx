import React from 'react'
import Header from './Header'

const BaseLayout = ({children}) => {
    const containerStyle = {
        backgroundColor: '#010C80', // Set the desired background color
      };
  return (
    <>
    
        <div style={containerStyle}>
        <Header />
        <br /> <br />

            {children}
        </div>
      
    </>
  )
}

export default BaseLayout