import React from "react"
import styled from "styled-components"

import OkIconSvg from "../svg/icon-ok.svg"
import CancelIconSvg from "../svg/icon-cancel.svg"
import PlaceholderSvg from "../svg/icon-maintenance.svg"

const Card = styled.div`
  width: 80%;
  height: 80%;
  
  display: flex;
  flex-direction: column;
  align-items: center;  
  justify-content: space-around;

  padding: 10px;
  
  background: white;

  border: 1px solid;  
  border-radius: 2%;
  box-shadow: 5px 5px 22px -8px rgba(0,0,0,0.75);
`

const Name = styled.div`
  font-size: 10vmin;
`

const Placeholder = styled(PlaceholderSvg)`
  width: 60vw;
  height: 60vw;
  
  opacity: 0.5;
`

const Description = styled.div`
  width: 70vw;
  max-height: 30%;
  
  font-size: 14px;
    
  text-align: center;
    
  text-overflow: ellipsis;
  overflow: hidden;
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
    <Name>{ item.name }</Name>
    <Placeholder />
    <Description>{ item.description }</Description>
    <ButtonContainer>
      { onTake && <OkButton onClick={ onTake } /> }
      { onDiscard && <CancelButton onClick={ onDiscard } /> }
    </ButtonContainer>
  </Card>