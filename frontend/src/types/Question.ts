export interface Question {
    question: string;
    answers: [
        answer1: string,
        answer2: string,
        answer3: string,
        answer4?: string
    ];
    correctAnswer: number;
    explanation: string;
}