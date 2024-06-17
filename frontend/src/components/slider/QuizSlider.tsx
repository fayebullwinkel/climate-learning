import Slider from "react-slick";
import React, {useEffect, useState} from "react";
import { Question } from '../../types';
import {Quiz} from "../../components/container";


const QuizSlider: React.FC = () => {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/quiz-questions`);
                if (!response.ok) throw new Error('Network response was not ok');
                const quizData = await response.json();
                if (!quizData.data) throw new Error('No questions available');

                const mappedQuestions: Question[] = quizData.data.map((item: any) => ({
                    question: item.attributes.question,
                    answers: [
                        item.attributes.answer1,
                        item.attributes.answer2,
                        item.attributes.answer3,
                        item.attributes.answer4 || ''
                    ].filter(answer => answer !== ''),
                    correctAnswer: item.attributes.correctAnswer - 1
                }));

                setQuestions(mappedQuestions);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchData();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!questions) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: '70%', margin: '0 auto', padding: '1%' }}>
            <Slider {...sliderSettings}>
                {questions.map((question, index) => (
                    <div key={index}><Quiz question={question}/></div>
                ))}
            </Slider>
            <style>{`
                .slick-prev:before, .slick-next:before {
                    color: #76b900;
                }
                .slick-track {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                }
            `}</style>
        </div>
    );
}

export default QuizSlider;