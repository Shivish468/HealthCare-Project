// Import necessary libraries
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface TimelineObject {
  id: number;
  eventType: string;
  // Add other timeline object properties here
}

interface CarouselProps {
  timelineObjects: TimelineObject[];
}

const Carousel: React.FC<CarouselProps> = ({ timelineObjects }) => {
  // Filter timeline objects where eventType is not "noEvent"
  const filteredTimeline = timelineObjects.filter((obj) => obj.eventType !== 'noEvent');

  // Configure settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Number of slides to show at a time
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {filteredTimeline.map((timelineObj) => (
        <div key={timelineObj.id} className="timeline-card">
          {/* Render the timeline object content here */}
          <h3>{timelineObj.eventType}</h3>
          {/* Add other timeline object content */}
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
