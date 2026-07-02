import React from 'react'
import Image from 'next/image';

type Props = {
  icon: string;
  name: string;
  description: string;
};

const ServiceCard = ({description, icon, name}: Props) => {
  return (
    <div>
      <Image
        src={icon}
        alt="img"
        width={60}
        height={60}
        style={{ filter: "invert(57%) sepia(86%) saturate(600%) hue-rotate(170deg) brightness(101%) contrast(102%)" }}
      />
      <h1 className="mt-6 text-gray-300">{name}</h1>
      <p className="mt-6 text-gray-300">{description}</p>
    </div>
  )
}

export default ServiceCard