import React, { useEffect, useState } from 'react';

import { message } from 'antd';

import ResultCard from './components/ResultCard';

import ContentContainer from '../../components/ContentContainer';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';

import useMediaQuery from '../../hooks/useMediaQuery';
import { getResults, deleteResult } from '../../hooks/useXmlHttpService';

const Results = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ismobile } = useMediaQuery();

  const fetchResults = () => {
    getResults()
      .then((res) => setResults(res.map((result) => ({ ...result, open: false }))))
      .catch((err) => message.error(err.detail))
      .finally(() => setLoading(false));
  };

  const removeResult = (id) => {
    deleteResult(id)
      .then((res) => {
        message.success(res.message);
        fetchResults();
      })
      .catch((err) => message.error(err.message || 'Something Went Wrong'));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <>
      <Header ismobile={ismobile} title="Results" />
      <ContentContainer>
        {loading ? <Spinner /> : results.map((result) => (
          <ResultCard
            key={result.id}
            rs={result}
            deleteResult={(id) => removeResult(id)}
          />
        )) }
      </ContentContainer>
    </>
  );
};

export default Results;
