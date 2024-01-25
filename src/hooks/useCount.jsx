import { useState } from "react";


//Hook that works as a counter, has an initial, minimum and maximum value according to what is desired
export const useCount = (initial = 1, min, max) => {

    if (initial < min || initial > max) initial = min;

    //Counter status
    const [count, setCount] = useState(initial);

    //Counter decrement function
    const decrement = () => {
        if (count > min) setCount(prev => prev - 1);
    }

    //Counter increment function
    const increment = () => {
        if (count < max) setCount(prev => prev + 1);
    }

    //Function to reset the counter value
    const reset = () => {
        setCount(initial)
    }

    return { count, decrement, increment, reset }
}
