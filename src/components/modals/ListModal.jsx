import React, { useEffect } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Background, Content } from './styles'
import { useState } from 'react'
import { 
    DiaryList,
    Tbody,
    TableCell,
    Table,
    Thead,
    SelectWrapper,
 } from '../../pages/DiaryList/styles'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const ListModal = ({onClose}) => {
    const [myList, setMyList] = useState([]);

    const { data } = useQuery('myDiaries', async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles`);
        return response.data.data;
    });

    console.log("Data", data);
    useEffect(() => {
        if (data) {
            setMyList(data);
            console.log("myList = ", myList);
        }
    }, [data]);

    return (
        <Background>
            <Content radius={"3%"} width={"80%"}>
                <div style={{width: "100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <SelectWrapper>
                        <BtnWrapper>
                            <Button onClick={() => onClose()}> X </Button>
                        </BtnWrapper>
                    </SelectWrapper>
                    <DiaryList>
                        <Table>
                            <Thead>
                                <tr>
                                    <th>번호</th>
                                    <th>작성자</th>
                                    <th>제목</th>
                                    <th>좋아요</th>
                                </tr>
                            </Thead>
                            <Tbody>
                            {myList ? myList.map((diary) => (
                                <tr key={diary.id}> {/* 각 항목에 고유한 key 값을 설정해주어야 함 */}
                                    <TableCell>{diary.id}</TableCell>
                                    <TableCell>{diary.writer}</TableCell>
                                    <TableCell>{diary.title}</TableCell>
                                    <TableCell>{diary.content}</TableCell>
                                </tr>
                                )
                            )
                            : (
                                <h1>작성한 일지가 없습니다.</h1>
                            )}
                            </Tbody>
                        </Table>
                    </DiaryList>
                </div>
            </Content>
        </Background>
    )
}

const BtnWrapper = styled.div`
    position: fixed;
    top: 10%;
    right: 15%;
`

export const Button = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background-color: skyblue;
    font-weight: 700;
    color: black;
    font-size: 30px;
`;
export default ListModal
