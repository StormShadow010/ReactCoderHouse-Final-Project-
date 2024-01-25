import { useState } from "react";

export const useCount = (initial = 1, min, max) => {

    if (initial < min || initial > max) initial = min;

    const [count, setCount] = useState(initial);

    const decrement = () => {
        if (count > min) setCount(prev => prev - 1);
    }

    const increment = () => {
        if (count < max) setCount(prev => prev + 1);
    }

    const reset = () => {
        setCount(initial)
    }

    return { count, decrement, increment, reset }
}
