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
    border: 1px solid #ced4da;
    border-radius: 10px;
    width: 900px;
`;

export const ContentContainer = styled.div`
    padding: 20px;
    min-height: 200px;
    border-top: 1px dashed #ced4da;
`;

export const Title = styled.div`
    font-size: 21px;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 20px;
`;

export const TextHeader = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 2px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #929292;
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

export const FooterAreaContainer = styled.div`
    padding: 20px;
    border-radius: 8px;
    width: 900px;
`;

export const IconContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #ced4da;
`;

export const IconArea = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

export const IconText = styled.div`
    margin-right: 30px;
    margin-left: 5px;
`;

export const CommentContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 10px;
`;

export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CommentHeaderRight = styled.div`
    display: block;
    text-align: right;
    height: 47.5px;
`;

export const MiddleText = styled.div`
    color: #929292;
    font-size: 15px;
`;

export const CommentText = styled.div`
    min-height: 40px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
`;

export const StyledTextarea = styled.textarea`
    width: ${(props) => (props.border ? '878px' : '840px')};   
    padding: 10px;
    font-size: 16px;
    color: #333;
    border: ${(props) => (props.border ? '1px solid #ccc' : 'none')};
    border-radius: ${(props) => (props.border ? '5px' : 'none')};
    resize: none;
`;

export const ScrollableContainer = styled.div`
    max-height: 400px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #d9d7d7 white;
    margin: 8px;
    
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #929292;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
    }
`;