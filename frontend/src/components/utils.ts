import {Question} from "@/types";
import {useState, useRef} from "react";

export const getImageCardsStyle = (): React.CSSProperties => {
    return {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: window.innerWidth <= 768 ? "column" : "row",
        flexWrap: "wrap",
        width:  window.innerWidth <= 768 ? "85%" : "70%",
        margin: "0 auto"
    };
};

export const formatQuestions = (questions: any): Question[] => {
    return questions.map((item: any) => ({
        question: item.attributes.question,
        answers: [
            item.attributes.answer1,
            item.attributes.answer2,
            item.attributes.answer3
        ].filter(answer => answer !== ""),
        correctAnswer: item.attributes.correctAnswer - 1,
        explanation: item.attributes.explanation
    }));
}

const useHover = (delay = 1500) => {
    const [showCredits, setShowCredits] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        timerRef.current = setTimeout(() => {
            setShowCredits(true);
        }, delay);
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setShowCredits(false);
    };

    return {
        showCredits,
        mousePosition,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
    };
};

export default useHover;