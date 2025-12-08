import "./carrossel.css"; 
import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

interface CarrosselItem {
    src: string; 
    alt: string; 
}

interface CarrosselProps {
    data: CarrosselItem[]; 
}

export const Carrossel = ({ data }: CarrosselProps) => {
  
    if (!data || data.length === 0) {
        return <div className="carrossel-container-empty">Nenhum item para exibir no carrossel.</div>;
    }

    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setSlide(index);
    };

    return (
        <div className="carrossel">
            
            <BsArrowLeftCircleFill 
                className="arrow arrow-left"
                onClick={prevSlide}
            />

            {data.map((item, index) => (
                <img 
                    key={index}
                    src={item.src} 
                    alt={item.alt} 
                    className={slide === index ? "slide" : "slide slide-hidden"} 
                />
            ))}

            <BsArrowRightCircleFill 
                className="arrow arrow-right"
                onClick={nextSlide}
            />

            <span className="indicators">
                {data.map((_, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => goToSlide(idx)}
                        className={slide === idx ? "indicator active" : "indicator"}
                    ></button>
                ))}
            </span>
        </div>
    );
};

export default Carrossel;
