import React from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm';

type Props = {
    stockSymbol : string;
}

const StockComment = ({ stockSymbol }: Props) => {
  return (
    <StockCommentForm symbol={stockSymbol} />
  )
}

export default StockComment