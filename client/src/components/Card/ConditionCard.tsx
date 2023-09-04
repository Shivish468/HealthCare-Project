import React from 'react';

interface ConditionCardProps {
  // Define props that customize the card content here
  title: string;
}

const ConditionCard: React.FC<ConditionCardProps> = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  );
};

export default ConditionCard;
