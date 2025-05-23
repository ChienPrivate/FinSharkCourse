import React from 'react'

type Props = {
    error? : any;
    message? : string;
}

const ErrorBox = ({error, message}: Props) => {
    const displayMessage = message || 'Something went wrong on this section';
  return (
    <div
      className="bg-red-100 text-red-700 p-4 rounded-md relative cursor-help shadow-lg shadow-red-300/50"
      title={error?.message || JSON.stringify(error, null, 2)}
    >
      ⚠️ {displayMessage}
    </div>
  )
}

export default ErrorBox