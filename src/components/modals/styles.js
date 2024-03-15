import styled from "styled-components";

export const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0,0,0,0.4);
`;

export const Content = styled.div`
  height: 90%;
  width: 600px;
  border-radius: 10%;
  border: 3px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: white;
`;