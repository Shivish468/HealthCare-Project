import React from 'react';

interface MedicationCardProps {
  // Define props that customize the card content here
  title: string;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  );
};

export default MedicationCard;
