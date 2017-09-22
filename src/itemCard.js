import React from "react"
import styled from "styled-components"

import OkIconSvg from "./icon-ok.svg"
import CancelIconSvg from "./icon-cancel.svg"
import PlaceholderSvg from "./icon-maintenance.svg"

const Card = styled.div`
  width: 80%;
  height: 80%;
  
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

export default ({ item, onTake, onDiscard }) =>
  <Card>
    <h1>{ item.name }</h1>
    <Placeholder />
    <Description>{ item.description }</Description>
    <ButtonContainer>
      { onTake && <OkButton onClick={ onTake } /> }
      { onDiscard && <CancelButton onClick={ onDiscard } /> }
    </ButtonContainer>
  </Card>
