import { useState, useEffect } from 'react';

const UseHover = (delay: number = 300) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [showCredits, setShowCredits] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (hovered) {
            timer = setTimeout(() => {
                setShowCredits(true);
            }, delay);
        } else {
            setShowCredits(false);
        }
        return () => clearTimeout(timer);
    }, [hovered, delay]);

    const onMouseEnter = () => setHovered(true);
    const onMouseLeave = () => setHovered(false);

    return { showCredits, onMouseEnter, onMouseLeave };
};

export default UseHover;