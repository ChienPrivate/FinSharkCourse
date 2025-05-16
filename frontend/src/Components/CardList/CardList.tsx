import React, { JSX } from 'react'
import Card from '../Card/Card'

interface Props {}

const CardList : React.FC<Props> = (
    props: Props) : JSX.Element => {
  return (
    <div className="">
        <Card  companyName='Apple' ticker='AAPL' price={100} />
        <Card  companyName='Microsoft' ticker='MSFT' price={200} />
        <Card  companyName='Testla' ticker='TSLA' price={4} />
    </div>
  )
}

export default CardList