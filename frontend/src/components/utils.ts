import {Question} from "@/types";

export const getImageCardsStyle = (): React.CSSProperties => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        flexWrap: 'wrap',
        width:  window.innerWidth <= 768 ? '85%' : '70%',
        margin: '0 auto'
    };
};

export const formatQuestions = (questions: any): Question[] => {
    return questions.map((item: any) => ({
        question: item.attributes.question,
        answers: [
            item.attributes.answer1,
            item.attributes.answer2,
            item.attributes.answer3
        ].filter(answer => answer !== ''),
        correctAnswer: item.attributes.correctAnswer - 1,
        explanation: item.attributes.explanation
    }));
}