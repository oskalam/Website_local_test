import { useState, useCallback, useEffect } from "react";

const carouselItems = [
    {
        image: "https://via.placeholder.com/400x200?text=Project+1",
        title: "AI Booking Agent",
        story: "Intelligent voice agent that handles phone calls 24/7, automatically answers customer FAQs, processes bookings and reservations, and sends personalized reminders via WhatsApp, email, and SMS. Try this concept out by scrolling down to the page!",
    },
    {
        image: "https://via.placeholder.com/400x200?text=Project+2",
        title: "RFP Intelligence Platform",
        story: "Transform unstructured RFP documents into searchable knowledge vectors. AI agents can instantly query requirements, specifications, and compliance criteria across thousands of proposals.",
    },
    {
        image: "https://via.placeholder.com/400x200?text=Project+3",
        title: "Call Intelligence Analytics",
        story: "Transform customer service calls into actionable business intelligence. AI-powered analysis extracts key entities, and decision patterns from conversations, turning lengthy support interactions into structured data for strategic decision making.",
    },
];

const mainColor = "#2c5281";

const getItemStyle = (index: number, current: number, length: number) => {
    const diff = (index - current + length) % length;
    if (diff === 0) {
        return { transform: "translateX(0%) scale(1)", opacity: 1, zIndex: 30 };
    }
    if (diff === 1 || diff === -length + 1) {
        return { transform: "translateX(70%) scale(0.8)", opacity: 0.4, zIndex: 10 };
    }
    if (diff === length - 1 || diff === -1) {
        return { transform: "translateX(-70%) scale(0.8)", opacity: 0.4, zIndex: 10 };
    }
    return { transform: "translateX(0%) scale(0.6)", opacity: 0, zIndex: 0 };
};

const Carousel: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const length = carouselItems.length;

    const prev = useCallback(() => setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1)), [length]);
    const next = useCallback(() => setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1)), [length]);

    // Auto-advance carousel with responsive intervals
    useEffect(() => {
        // Determine interval based on screen size
        const getInterval = () => {
            return window.innerWidth < 768 ? 12000 : 18000; // 12s mobile, 18s desktop
        };

        let interval = setInterval(() => {
            next();
        }, getInterval());

        // Update interval on window resize
        const handleResize = () => {
            clearInterval(interval);
            interval = setInterval(() => {
                next();
            }, getInterval());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [next]);

    return (
        <div className="relative max-w-5xl mx-auto py-12 px-4">
            <div className="relative h-[480px] flex items-center justify-center overflow-hidden">
                {carouselItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="absolute w-full max-w-md transition-all duration-700 ease-in-out"
                        style={getItemStyle(idx, current, length)}
                    >
                        <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="rounded-md mb-4 w-full h-48 object-cover"
                                loading="lazy"
                            />
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 mb-4 text-center">{item.story}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-6 mt-8">
                <button
                    className="px-6 py-2 rounded-lg text-white hover:brightness-110 transition-colors shadow-md"
                    style={{ backgroundColor: mainColor }}
                    onClick={prev}
                    aria-label="Previous"
                >
                    &#8592; Previous
                </button>
                <button
                    className="px-6 py-2 rounded-lg text-white hover:brightness-110 transition-colors shadow-md"
                    style={{ backgroundColor: mainColor }}
                    onClick={next}
                    aria-label="Next"
                >
                    Next &#8594;
                </button>
            </div>

            <div className="flex justify-center mt-6 gap-2">
                {carouselItems.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? "" : "hover:brightness-110"}`}
                        style={{
                            backgroundColor: idx === current ? mainColor : "#e5e7eb",
                            width: idx === current ? "2rem" : "0.75rem",
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
