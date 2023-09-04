import React from 'react';

interface ImmunizationCardProps {
  // Define props that customize the card content here
  title: string;
}

const ImmunizationCard: React.FC<ImmunizationCardProps> = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  );
};

export default ImmunizationCard;
