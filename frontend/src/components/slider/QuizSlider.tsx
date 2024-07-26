import React, { useState } from "react";
import Slider from "react-slick";
import { Question } from "@/types";
import { Quiz } from "../../components/container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Shared.css";

interface QuizSliderProps {
    questions: Question[];
    feedbacks: String[]
}

const QuizSlider: React.FC<QuizSliderProps> = ({ questions, feedbacks }) => {
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [answeredCount, setAnsweredCount] = useState<number>(0);

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const triggerToastNotification = (message: string, type: "success" | "info") => {
        if (type === "success") {
            toast.success(message);
        } else {
            toast.info(message);
        }
    };

    const handleAnswerCorrect = () => {
        setCorrectCount(prevCount => prevCount + 1);
    };

    const handleAnswer = () => {
        setAnsweredCount(prevCount => prevCount + 1);
    };

    return (
        <div className="default-container" style={{marginBottom: "20px"}}>
            <ToastContainer position="bottom-right" />
            <Slider {...sliderSettings}>
                {questions.map((question, index) => (
                    <div key={index}>
                        <Quiz
                            question={question}
                            triggerToast={triggerToastNotification}
                            onAnswerCorrect={handleAnswerCorrect}
                            onAnswer={handleAnswer}  // Pass the onAnswer prop to the Quiz component
                        />
                    </div>
                ))}
                <div>
                    <div className="quiz-result">
                        <h3>Ergebnis:</h3>
                        <p>Du hast {correctCount} von {questions.length} Fragen richtig beantwortet.</p>
                        {answeredCount > 0 && (
                            <p>
                                {correctCount <= 2 && feedbacks[2]}
                                {correctCount === 3 || correctCount === 4 ? feedbacks[1] : ""}
                                {correctCount >= 5 && feedbacks[0]}
                            </p>
                        )}
                    </div>
                </div>
            </Slider>
            <style>{`
                .toast-success {
                    background-color: #76B900;
                }
                .toast-neutral {
                    background-color: #00C8EF;
                }
            `}</style>
        </div>
    );
};

export default QuizSlider;