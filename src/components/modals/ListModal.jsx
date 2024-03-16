import React, { useEffect } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import 
    { 
        Background,
        Content 
    } from './styles'
import { useState } from 'react'
import { 
    DiaryList,
    Tbody,
    TableCell,
    Table,
    Thead,
    SelectWrapper,
 } from '../../pages/DiaryList/styles'
import { ListContainer } from './styles'
import { UserContext } from '../../App'
import { useContext } from 'react'

import 
{ 
    MyListButton,
    BtnWrapper 
} from '../styles'

const ListModal = ({onClose}) => {
    // useContext를 통한 데이터 가져오기
    const {userInfo} = useContext(UserContext);
    // 리스트 필터링
    const [myList, setMyList] = useState([]);

    // 리스트 불러오기
    const { data } = useQuery('myDiaries', async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/articles`);
        return response.data.data;
    });

    useEffect(() => {
        if (data) {
            let userDiary = data.filter((diary) => diary.writer === userInfo.email);
            setMyList(userDiary);
        }
    }, [data]);

    return (
        <Background>
            <Content radius={"3%"} width={"80%"}>
                <ListContainer>
                    <SelectWrapper>
                        <BtnWrapper>
                            <MyListButton onClick={() => onClose()}> X </MyListButton>
                        </BtnWrapper>
                    </SelectWrapper>
                    <DiaryList>
                        <Table>
                            <Thead>
                                <tr style={{backgroundColor: "tomato", color:"white", fontWeight: "700"}}>
                                    <th style={{padding: "2% 0"}}>번호</th>
                                    <th>작성자</th>
                                    <th>제목</th>
                                    <th>좋아요</th>
                                </tr>
                            </Thead>
                            <Tbody>
                            {myList ? myList.map((diary) => (
                                <tr style={{fontWeight: "700"}} key={diary.id}> {/* 각 항목에 고유한 key 값을 설정해주어야 함 */}
                                    <TableCell>{diary.id}</TableCell>
                                    <TableCell>{diary.writer}</TableCell>
                                    <TableCell>{diary.title}</TableCell>
                                    <TableCell>{diary.like}</TableCell>
                                </tr>
                                )
                            )
                            : (
                                <h1>작성한 일지가 없습니다.</h1>
                            )}
                            </Tbody>
                        </Table>
                    </DiaryList>
                </ListContainer>
            </Content>
        </Background>
    )
}


export default ListModal
