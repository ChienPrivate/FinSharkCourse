import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioDelete : (e: SyntheticEvent) => void;
}

const DeletePortfolio = (props: Props) => {
  return (
    <div>DeletePortfolio</div>
  )
}

export default DeletePortfolio