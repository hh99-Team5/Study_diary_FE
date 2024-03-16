import React from 'react'
import { Background, Content } from './styles'

const ListModal = ({onClose}) => {
  return (
    <Background>
        <Content radius={"3%"} width={"80%"}>
            <div><button onClick={() => onClose()}>닫기</button></div>
            <div>List</div>
        </Content>
    </Background>
  )
}

export default ListModal