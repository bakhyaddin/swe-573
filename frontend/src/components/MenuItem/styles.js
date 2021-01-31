import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: ${({ ismobile }) => (ismobile ? 'column' : 'row')};
  align-items: center;
  height: 40px;
  cursor: pointer;
  color: ${({ theme }) => theme.main.colors.cyan};

  &:hover {
    color: ${({ theme }) => theme.main.colors.green};
  }

  &.active {
    color: ${({ theme }) => theme.main.colors.green};
    background-color: ${({ ismobile, theme }) => !ismobile && theme.main.colors.primaryColorDark};
    box-shadow: ${({ ismobile, theme }) => !ismobile && `3px 0px 0px 0px ${theme.main.colors.green} inset`}
  }

  .name {
    margin: 0;
    font-size: ${({ ismobile, theme }) => (ismobile ? theme.main.navBarMobileTextFontSize : theme.main.sideBarWebTextFontSize)};
  }
`;
