import styled from 'styled-components'

export const MainContainer = styled.div`
  background-image: url('images/bg.jpg');
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`
MainContainer.displayName = 'MainContainer'

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`
TextContainer.displayName = 'TextContainer'

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
FooterContainer.displayName = 'FooterContainer'

export const Title = styled.h1`
  font-size: 50px;
  color: #febea5;
  text-shadow: 3px 3px #d93f08;
`
Title.displayName = 'Title'

export const Text = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: #e6e6e6;
  text-shadow: 2px 6px 6px rgba(0, 0, 0, 0.3);
  padding: 2px;
`
Text.displayName = 'Text'

export const Button = styled.button`
  background-color: #7aaf67;
  border: none;
  color: white;
  padding: 15px 32px;
  margin: 30px;
  text-align: center;
  font-size: 16px;
  &:hover {
    background-color: #498217;
    cursor: pointer;
  }
`
Button.displayName = 'Button'

export const Subtitle = styled.div`
  font-size: 12px;
`
Subtitle.displayName = 'Subtitle'