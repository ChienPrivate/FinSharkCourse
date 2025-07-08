import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helper/ErrorHandler";

const api = "http://localhost:5167/api/portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
    try{
        const data = await axios.post<PortfolioPost>(api + `?Symbol=${symbol}`);
        return data;
    }
    catch(error)
    {
        handleError(error);
    }
}

export const portfolioDeleteAPI = async (symbol: string) => {
    try{
        const data = await axios.delete<PortfolioPost>(api + `?Symbol=${symbol}`);
        return data;
    }
    catch(error)
    {
        handleError(error);
    }
}

export const portfolioGetAPI = async () => {
    try{
        const data = await axios.get<PortfolioGet[]>(api);
        return data;
    }
    catch(error)
    {
        handleError(error);
    }
}