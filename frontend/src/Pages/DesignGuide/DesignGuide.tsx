import React from 'react'
import RatioList from '../../Components/RatioList/RatioList'
import Table from '../../Components/Table/Table'
import { testIncomeStatementData } from '../../Components/Table/TestData'
import { config } from 'dotenv'

type Props = {}

const tableConfig = [
  {
    label : "Market Cap",
    render : (company: any) => company.marketCapTTM,
    subTitle : "Total value of all a company's shares of stock",
  }
]

const DesignGuide = (props: Props) => {
  return (
    <>
        <h1>
            Design guide - this is the design guide for Fin Shark. These are reuable
            components of the app with brief instrutions on how to use them.
        </h1>
        <RatioList config={tableConfig} data={testIncomeStatementData}/>
        <Table config={tableConfig} data={testIncomeStatementData} />
        <h3>
            Table - Table take in a configuration object and company data as
            params. Use the config to style your table.
        </h3>
    </>
  )
}

export default DesignGuide