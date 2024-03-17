import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.div`
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.color ? props.color : "black"};
    color: ${(props) => props.color ? props.color : "black"};
    transition: color 0.2s linear; /* 아이콘 색상 변경에 대한 트랜지션 */
    border-radius: 15px;
    cursor: pointer;
    &:hover {
        background-color: ${(props) =>props.color ? props.color : "black"};
        color : white;
        border: none;
    }
`;
export const Icon = styled.div`
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color:  ${(props) => props.color ? props.color : "black"};
    transition: color 0.2s linear; /* 아이콘 색상 변경에 대한 트랜지션 */
`;

export const LargeButton = styled.div`
    width: 300px;
    height: 40px;
    border: 1px solid ${(props) => props.color ? props.color : "black"};
    color: ${(props) => props.color ? props.color : "black"};
    font-weight: 700;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s linear; /* 배경색 변경에 대한 트랜지션 */
    &:hover {
        background-color: ${(props) =>props.color ? props.color : "black"};
        color : white;
        border: none;
    }
`;


export const SelectArea = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10%;
height: 50%;
`;

export const Container = styled.div`
height: 80%;
width: 70%;
`;

export const BtnWrapper = styled.div`
    position: fixed;
    top: 10%;
    right: 15%;
`;

export const MyListButton = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    background-color: tomato;
    font-weight: 700;
    font-size: 30px;
`;