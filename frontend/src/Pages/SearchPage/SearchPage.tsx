import React, { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react'
import { searchCompanies } from '../../api';
import Search from '../../Components/Search/Search';
import BlockedListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { CompanySearch } from '../../company';

interface Props {}

const SearchPage = (props: Props) => {

  useEffect(() => {
    document.title = "Search - FinShark";
  }, []);

  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]); 
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if(exists) return;
    const updatePortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatePortfolio)
  }

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  }

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);

    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };
  return (
  <div className="App">
    <Search 
      onSearchSubmit={onSearchSubmit} 
      search={search} 
      handleSearchChange={handleSearchChange} />
    <BlockedListPortfolio 
      portfolioValues={portfolioValues} 
      onPortfolioDelete={onPortfolioDelete} />
    <CardList 
      searchResults={searchResult} 
      onPortfolioCreate={onPortfolioCreate}/>
      {serverError && <h1>{serverError}</h1>}
  </div>
  )
}

export default SearchPage