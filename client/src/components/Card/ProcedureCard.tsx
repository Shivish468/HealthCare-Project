import React from 'react';

interface ProcedureCardProps {
  // Define props that customize the card content here
  title: string;
}

const ProcedureCard: React.FC<ProcedureCardProps> = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  );
};

export default ProcedureCard;
