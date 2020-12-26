import { useMediaQuery } from 'react-responsive';

function useResponsive() {
  const xs = useMediaQuery({ query: '(max-width: 576px)' }) && true;
  const lg = useMediaQuery({ query: '(min-width: 992px)' }) && true;
  const md = !(xs || lg) && true;
  const ismobile = (xs || md) && true;

  // const ismobile = useMediaQuery({ query: '(max-width: 768px)' });

  // const ismobile = useMediaQuery({ query: '(max-width: 767px)' });

  return {
    xs, md, lg, ismobile,
  };
}

export default useResponsive;
