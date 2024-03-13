import { useState } from "react";

const useState = () => {
    const [state, setState] = useState(false);

    const handleState = () => {
        setState(!state);
    }

    return {state, handleState};
}