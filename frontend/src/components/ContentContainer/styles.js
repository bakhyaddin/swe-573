import styled from 'styled-components';

export default styled.div`
  /* display: flex;
  flex-flow: column; */

  overflow: scroll;
  position: relative;

  height: ${({ theme, ismobile }) => (ismobile ? `calc(100vh - ${theme.mobile.bottomNavBar.height})` : '100vh')};
  width: 100%;
  padding: ${({ theme, ismobile }) => (ismobile ? `${theme.mobile.bottomNavBar.paddingFromBottom} ${theme.main.paddingHorizontal} ${theme.main.paddingVertical} ${theme.main.paddingHorizontal};`
    : `calc(${theme.header.height} + ${theme.main.paddingVertical}) ${theme.main.paddingHorizontal} ${theme.main.paddingVertical} ${theme.main.paddingHorizontal};`)};
`;
