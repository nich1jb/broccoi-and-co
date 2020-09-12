import styled, { keyframes } from 'styled-components'
import { zoomIn, fadeIn } from 'react-animations'

const zoomInAnimation = keyframes`${zoomIn}`
const fadeInAnimation = keyframes`${fadeIn}`

export const ModalBackDrop = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 1;
  background-color: rgba(0,0,0,0.4);
  animation: 0.5s ${fadeInAnimation};
`
ModalBackDrop.displayName = 'ModalBackDrop'

export const ModalContainer = styled.div`
  width: 450px;
  max-width: 80%;
  height: 350px;  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative; 
  background: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #e6e6e6;
  border: 5px solid #9c528b;
  border-radius: 10px;
  color: #9c528b;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: 0.5s ${zoomInAnimation};
`
ModalContainer.displayName = 'ModalContainer'

export const ModalHeader = styled.div`
  font-size: 25px;
  font-weight: 600;
  padding-bottom: 20px;
  border-bottom: 2px solid #9c528b;
`
ModalHeader.displayName = 'ModalHeader'

export const ModalText = styled.div`
  font-size: 20px;
`
ModalText.displayName = 'ModalText'

export const ErrorText = styled.span`
  font-size: 14px;
  color: red;
`
ErrorText.displayName = 'ErrorText'

export const InputField = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  margin: 5px 0;
`
InputField.displayName = 'InputField'

export const InputSubmit = styled(InputField)`
  border: none;
  color: #fff;
  background-color: #9c528b;
  &:hover {
    background-color: #65355a;
    cursor: pointer;
  }
  &:disabled {
    background-color: #ad82a3;
    cursor: auto;
  }
`
InputSubmit.displayName = 'InputSubmit'