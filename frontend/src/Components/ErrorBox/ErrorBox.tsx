import React from 'react'

type Props = {
    message? : string;
}

const ErrorBox = ({ message }: Props) => {
    const displayMessage = message || 'Something went wrong on this section';
  return (
    <div
      className="bg-red-100 text-red-700 p-4 rounded-md relative cursor-help shadow-lg shadow-red-300/50">
      ⚠️ {displayMessage}
    </div>
  )
}

export default ErrorBox