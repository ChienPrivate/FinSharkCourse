import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignGuide from "../Pages/DesignGuide/DesignGuide";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element : <App />,
        children: [
            {path: "", element:  <HomePage />},
            {path: "login", element:  <LoginPage />},
            {path: "register", element:  <RegisterPage />},
            {path: "search", element:  <SearchPage />},
            {path: "design-guide", element:  <DesignGuide />},
            {path: "company/:ticker", 
                element:  <CompanyPage />,
                children: [
                    {path: "company-profile", element:  <CompanyProfile />},
                    {path: "income-statement", element:  <IncomeStatement />},
                    {path: "balance-sheet", element:  <BalanceSheet />},
                    {path: "cashflow-statement", element:  <CashFlowStatement />},
                ]}
        ]
    }
]);