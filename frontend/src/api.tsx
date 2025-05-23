import axios from "axios";
import { CompanyBalanceSheet, CompanyCashFlow, CompanyCompData, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from "./company";

interface SearchResponse{
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try {
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
        );

        return data;
    }
    catch(error : unknown){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message);
            return error.message;
        }
        else{
            console.log("unexpected error: ",error);
            return "An expected error has occured.";
        }
    }
};

export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    }
    catch(error : any) {
        console.log("error message from API: ", error.message);
    }
};

export const getKeyMetrics = async (query: string) => {
    try{
        const data = axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    }
    catch(error: any)
    {
        console.log("error message: ", error.message);
    }
};

export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    }
    catch (error : any) {
        console.log("error message: ", error.message);
    }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    }
    catch (error : any) {
        console.log("error message: ", error.message);
    }
};

export const getCashFlowStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    }
    catch (error : any) {
        console.log("error message: ", error.message);
    }
};

// This endpoint is not available under your current subscription agreement, 
// please visit our subscription page to upgrade your plan or contact us at 
// https://site.financialmodelingprep.com/developer/docs/pricing
// this endpoint is only for learning purpose althought it doesn't work.
export const getCompData = async (query: string) => {
    try {
        const data = await axios.get<CompanyCompData[]>(
            `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    }
    catch (error : any) {
        console.log("error message: ", error.message);
    }
};

export const getTenK = async (query: string) => {
    try {
        const data = await axios.get<CompanyTenK[]>(
            `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-k&page=0&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    }
    catch (error : any) {
        console.log("error message: ", error.message);
    }
};