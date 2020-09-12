import React from 'react'

import { CustomAppBar, Text, LogoImg } from './appBar.styles'

export const AppBar = (props) => {
  const { position } = props

  return (
    <CustomAppBar position={position}>
      {position === 'header' &&
        <LogoImg src='images/logo.png' />}
      {position === 'footer' && 
      <>
        <Text>Made with 💚 in Melbourne</Text>
        <Text>&copy; 2016 Broccoli &amp; Co. All Rights Reserved</Text>
      </>}
    </CustomAppBar>
  )

}