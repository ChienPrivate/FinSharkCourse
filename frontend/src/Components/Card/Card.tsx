import React, { JSX } from 'react'
import "./Card.css"

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card: React.FC<Props> = ({
  companyName, 
  ticker, 
  price
}: Props) : JSX.Element => {
  return <div className="card">
    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/1200px-IMG_Academy_Logo.svg.png" 
    alt="Image" />
    <div className="detail">
        <h2>
          {companyName} ({ticker})
          </h2>
        <p>${price}</p>
    </div>
    <p className="info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Eveniet sint officiis ab nesciunt consequatur ullam recusandae, 
        error fuga alias possimus consequuntur, 
        perspiciatis harum odit molestiae rerum eos repudiandae praesentium nihil?
    </p>
  </div>;
};

export default Card;