import {Button} from "../../components/styles"
import 
{ ButtonArea,
    DiaryList,
    Tbody,
    TableCell,
    Table,
    Thead,
    SelectWrapper,
    Select,
    Input
} from "./styles"

export const SelectArea = ({selectRef, keywordRef, handleSearch}) => {
    return(
        <SelectWrapper>
            <Select ref={selectRef}>
                <option value="writer">작성자</option>
                <option value="title">제목</option>
                <option value="contents">내용</option>
            </Select>
            <Input type="text" ref={keywordRef} />
            <div><Button onClick={handleSearch}>검색</Button></div>
        </SelectWrapper>
    )
}

export const ListArea = ({dataToShow, handleDiaryClick}) => {
    return (
        <DiaryList>
            <Table>
                <Thead>
                    <tr style={{backgroundColor: "#8ec7fd"}}>
                        <th style={{padding: "1% 0"}}>번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>좋아요</th>
                    </tr>
                </Thead>
                {dataToShow && dataToShow.length > 0 && (
                    <Tbody>
                        {dataToShow.map(diary => (
                            <tr key={diary.id}>
                                <TableCell>{diary.id}</TableCell>
                                <TableCell>{diary.writer}</TableCell>
                                <TableCell onClick={() => handleDiaryClick(diary.id)} style={{ cursor: 'pointer' }}>{diary.title}</TableCell>
                                <TableCell>{diary.like}</TableCell>
                            </tr>
                        ))}
                    </Tbody>
                )}
            </Table>
        </DiaryList>
    )
}

export const BtnArea = ({nav}) => {
    return (
        <ButtonArea>
            <Button onClick={() => nav()}>일지 쓰기</Button>
        </ButtonArea>
    )
}