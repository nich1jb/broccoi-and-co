import React, { useState } from 'react'

import AppBar from '../appBar'
import Modal from '../modal'
import { MainContainer, TextContainer, FooterContainer, Title, Text, Button, Subtitle } from './dashboard.styles'

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <MainContainer>
        <AppBar position='header' />
        <TextContainer>
          <Title>
            A better way to enjoy every day.
          </Title>
          <Text>Be the first to know when we launch</Text>
          <Button onClick={openModal}>Request an invite</Button>
        </TextContainer>

        <FooterContainer>
          <Subtitle>Photo by Lukas from Pexels</Subtitle>
          <AppBar position='footer'/>
        </FooterContainer>
      </MainContainer>
      {showModal && <Modal close={closeModal}/>}
    </>
  )

}