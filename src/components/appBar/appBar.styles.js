import styled, { css } from 'styled-components'

export const CustomAppBar = styled.div`
${(props) => props.position === 'header' && css`
  width: 100%;
  height: 75px;
  background-color: #7aaf67;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
`}
${(props) => props.position === 'footer' && css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: #0f1e0b;
  color: #e6e6e6;
  text-align: center;
  margin: 5px 5px 0;
`}
`
CustomAppBar.displayName = 'CustomAppBar'

export const Text = styled.div`
  font-size: calc(13px + .5vw);
`
Text.displayName = 'Text'

export const LogoImg = styled.img`
  height: 100%;
`
LogoImg.displayName = 'LogoImg'