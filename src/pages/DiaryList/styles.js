import styled from "styled-components";

export const ButtonArea = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
`

export const DiaryList = styled.div`
  width: 80%;
  height: 400px;
  overflow-y: auto; /* 수직 스크롤 표시 */
  position: relative; /* Make the container relative for absolute positioning */
  border: 1px solid #ccc; /* 테두리 추가 (디버깅 용도) */
  border-radius: 30px;
`;

export const Tbody = styled.tbody`
  overflow-y: auto; /* 수직 스크롤 표시 */
  max-height: 180px;
  width: 100%; /* 최대 너비 설정 */
`;

export const TableCell = styled.td`
  text-align: center; /* 텍스트 가운데 정렬 */
  padding: 2%  0;
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed; /* 컬럼 너비 고정 */
  border-collapse: collapse; /* 셀 간의 간격 제거 */
`;

export const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1; /* Ensure it's above tbody */
  background-color: white; /* Match background color of parent */
`;

export const Container = styled.div`
  position: fixed;
  top: 5%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  gap: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5%;
`

export const Select = styled.select`
  width: 10%;
  padding: 1 2%;
  border-radius: 15px;
`

export const Input = styled.input`
  width: 30%;
  border-radius: 20px;
`