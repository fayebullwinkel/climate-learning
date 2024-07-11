import Slider from "react-slick";
import { Question } from '@/types';
import { Quiz } from "../../components/container";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/Shared.css';

interface QuizSliderProps {
    questions: Question[];
}

const QuizSlider: React.FC<QuizSliderProps> = ({ questions }) => {
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const triggerToastNotification = (message: string, type: "success" | "info") => {
        if (type === "success") {
            toast.success(message);
        } else {
            toast.info(message);
        }
    };

    return (
        <div className='default-container' style={{marginBottom: '20px'}}>
            <ToastContainer position="bottom-right" />
            <Slider {...sliderSettings}>
                {questions.map((question, index) => (
                    <div key={index}>
                        <Quiz question={question} triggerToast={triggerToastNotification} />
                    </div>
                ))}
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