import React from 'react';

interface AllergiesCardProps {
  // Define props that customize the card content here
  title: string;
}

const AllergiesCard: React.FC<AllergiesCardProps> = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  );
};

export default AllergiesCard;
