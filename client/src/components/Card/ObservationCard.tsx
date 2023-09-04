import React from 'react';

interface ObservationCardProps {
  // Define props that customize the card content here
  title: string;
}

const ObservationCard: React.FC<ObservationCardProps> = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  );
};

export default ObservationCard;
