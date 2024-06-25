import React, { useState } from 'react';
import { Question } from '@/types';
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";

interface QuizProps {
    question: Question;
    triggerToast: (message: string, type: "success" | "info") => void;
}

const Quiz: React.FC<QuizProps> = ({ question, triggerToast }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswer(parseInt(event.target.value));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (selectedAnswer !== null && selectedAnswer === question.correctAnswer) {
            triggerToast("Super gemacht!", "success");
        } else {
            triggerToast(`Nicht ganz. Die richtige Antwort ist: ${question.answers[question.correctAnswer]}`, "info");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    <h3 style={{ textAlign: "left", marginBottom: "10px", fontFamily: 'Source Sans Pro, sans-serif', fontSize: '1.3rem'}}>
                        {question.question}
                    </h3>
                    <RadioGroup
                        aria-label="quiz"
                        name="quiz"
                        value={selectedAnswer?.toString() ?? ''}
                        onChange={handleAnswerChange}
                    >
                        {question.answers.map((answer, index) => (
                            <FormControlLabel
                                key={`${question.question}-${index}`}
                                value={index.toString()}
                                control={<Radio />}
                                label={<span style={{ fontFamily: 'Source Sans Pro, sans-serif', fontSize: '1.3rem' }}>{answer}</span>}
                                disabled={submitted}
                                className={submitted && index === question.correctAnswer ? 'correct-answer' : ''}
                            />
                        ))}
                    </RadioGroup>
                    <Button
                        variant="contained"
                        type="submit"
                        size="small"
                        disabled={submitted}
                        style={{ backgroundColor: '#76B900', marginTop: '10px', maxWidth: "200px" }}
                    >
                        Antwort prüfen
                    </Button>
                    {submitted && (
                        <p style={{ maxWidth: '95%'}}>
                            {question.explanation}
                        </p>
                    )}
                </FormControl>
            </form>
            <style>
                {`
                .correct-answer .MuiFormControlLabel-label {
                    color: green !important;
                }
                `}
            </style>
        </div>
    );
};

export default Quiz;