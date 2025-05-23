import React, { useEffect, useState } from 'react'
import { CompanyCompData } from '../../company';
import { getCompData } from '../../api';
import CompFinderItem from './CompFinderItem/CompFinderItem';
import ErrorBox from '../ErrorBox/ErrorBox';

type Props = {
    ticker: string;
};

const CompFinder = ({ticker}: Props) => {
    const [companyData, setCompanyData] = useState<CompanyCompData>();
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        const getComps = async () => {
          try {
            const response = await getCompData(ticker);
            setCompanyData(response?.data[0]);
            setError(null); // clear lỗi nếu có data
          } catch (err: any) {
            // Nếu lỗi do API trả về
            const apiErrorMessage =
              err.response?.data?.['Error Message'] ||
              err.message ||
              'Lỗi không xác định';
            setError(new Error(apiErrorMessage));
            setCompanyData(undefined);
          }
        };
      
        getComps();
      }, [ticker]);
  return (
    <div className='inline-flex rounded-md shadow-sm m-4'>
        { companyData ? (companyData?.peersList.map((tiker) => { return <CompFinderItem ticker={tiker} />; })) : ( <ErrorBox /> ) }
    </div>
  )
}

export default CompFinder