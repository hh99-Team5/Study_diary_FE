import {useState, useRef} from 'react'

// 정보 입력 hook
export const useInput = () => {
    const [value, setValue] = useState('');
    const ref = useRef(null);
    const handler = (e) => {
      setValue(e.target.value);
    }

  return {value, handler, ref};
}

// 상태 변화 hook
export const useSwitch = () => {
  const [state, setState] = useState(false);

  const handleState = () => {
      setState(!state);
  }

  return {state, handleState};
}



// 객체 반환 hook
// export const useRepo = () => {
//   const [model, setModel] = useState({});
//   const saveModel = (newTodo) => {
//     setModel(newTodo);

//     return model;
//   }

//   return {model, saveModel};
// }
