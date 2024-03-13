import {useState, useRef} from 'react'

function useInput() {
    const [value, setValue] = useState('');
    const ref = useRef(null);
    const handler = (e) => {
      setValue(e.target.value);
    }

  return {value, handler, ref};
}

export default useInput