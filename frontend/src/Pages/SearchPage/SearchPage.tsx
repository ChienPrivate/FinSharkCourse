import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { searchCompanies } from '../../api';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { CompanySearch } from '../../company';
import { PortfolioGet } from '../../Models/Portfolio';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Service/PortfolioService';
import { toast } from 'react-toastify';
import { string } from 'yup';

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]); 
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPortfolio = () => {
    portfolioGetAPI()
    .then((res) => {
      if(res?.data){
        setPortfolioValues(res?.data);
      }
    })
    .catch((e) => {
      toast.warning("Could not get portfolio values!");
    })
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
    .then((res) => {  
      if([200,201,204].includes(res?.status as number)){
        toast.success("Stock added to portfolio!");
        getPortfolio();
      }
    })
    .catch((e) => {
      toast.warning("Could not create portfolio item!");
    })
  }

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value)
    .then((res) => {
      if(res?.status === 200){
        toast.success("Stock deleted from portfolio !");
        getPortfolio();
      }
    })
  }

  useEffect(() => {
    getPortfolio();
  } ,[])

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);

    if(typeof result === "string"){
      setServerError(result);
    }
    else if(Array.isArray(result.data)){
      setSearchResult(result.data);
    }
  };
  return (
  <div className="App">
    <Search 
      onSearchSubmit={onSearchSubmit} 
      search={search} 
      handleSearchChange={handleSearchChange} />
    <ListPortfolio 
      portfolioValues={portfolioValues!} 
      onPortfolioDelete={onPortfolioDelete} />
    <CardList 
      searchResults={searchResult} 
      onPortfolioCreate={onPortfolioCreate}/>
      {serverError && <h1>{serverError}</h1>}
  </div>
  )
}

export default SearchPage