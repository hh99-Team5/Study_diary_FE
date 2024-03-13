import { useState } from "react";

const useInput = () => {
    const [state, setState] = useState(false);

    const handleState = () => {
        setState(!state);
    }

    return {state, handleState};
}

export default useInput