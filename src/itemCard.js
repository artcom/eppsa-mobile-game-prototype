import React from "react"
import styled from "styled-components"

import OkIconSvg from "./icon-ok.svg"
import CancelIconSvg from "./icon-cancel.svg"
import PlaceholderSvg from "./icon-maintenance.svg"

const Container = styled.div`
  position: absolute;

  display: flex;
  
  width: 100vw;
  height: 100%;
  
  justify-content: center;
  align-items: center;  
  
  background-color: rgba(0, 0, 0, 0.2);
`

const Card = styled.div`
  position: absolute;

  width: 80vw;
  height: 80vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;  
  justify-content: space-around;

  padding: 10px;

  border: 1px solid;  
  border-radius: 2%;
  
  background: white;
`

const Placeholder = styled(PlaceholderSvg)`
  width: 60vw;
  height: 60vw;
  
  opacity: 50%;
`

const Description = styled.div`
  width: 70vw;
`

const ButtonContainer = styled.div`
  display: flex;
  
  width: 100%;
  
  justify-content: space-around;
  
  padding: 10px;
`

const OkButton = styled(OkIconSvg)`
  width: 20vw;
  height: 20vw;
`

const CancelButton = styled(CancelIconSvg)`
  width: 20vw;
  height: 20vw;
`

export default ({ item, isQuestItem, onTake, onDiscard }) =>
  <Container>
    <Card>
      <h1>{ item.name }</h1>
      <Placeholder />
      <Description>{ item.description }</Description>
      <ButtonContainer>
        { isQuestItem && <OkButton onClick={ onTake } /> }
        <CancelButton onClick={ onDiscard } />
      </ButtonContainer>
    </Card>
  </Container>
