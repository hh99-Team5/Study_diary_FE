import styled from "styled-components";

export const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

export const TextAreaContainer = styled.div`
    padding: 20px;
    width: 900px;
`;

export const TitleContainer = styled.div`
    border-bottom: 1px dashed #ced4da;
    margin-bottom: 20px;
`;

export const Title = styled.div`
    font-size: 21px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
`;

export const InputContainer = styled.div`
    margin-left: 20px;
    margin-bottom: 10px;
`;

export const StyledInput = styled.input`
    width: 840px;   
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const StyledTextarea = styled.textarea`
    width: 840px;   
    padding: 10px;
    font-size: 16px;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    margin-bottom: 20px;
`;

export const MiddleText = styled.div`
    margin-bottom: 10px;
`;

export const ButtonArea = styled.div`
    display: flex;
    justify-content: flex-end
`;

export const Button = styled.button`
    text-align: center;
    color: #929292;
    font-size: ${(props) => (props.border ? '15px' : 'none')};
    width: ${(props) => (props.border ? '100px' : 'none')};
    height: ${(props) => (props.border ? '35px' : '25px')};
    border: ${(props) => (props.border ? '1px solid #929292' : 'none')};
    border-radius: ${(props) => (props.border ? '15px' : 'none')};
    margin-left: ${(props) => (props.border ? '5px' : '-2px')};
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => (props.border ? '#929292' : 'none')};
        color: ${(props) => (props.border ? 'white' : 'black')};
    }
`;