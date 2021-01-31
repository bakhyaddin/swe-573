import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100vw;
    height: ${({ theme }) => theme.mobile.bottomNavBar.height};
    background-color: ${({ theme }) => theme.main.colors.primaryColorLight};
    z-index: 1000;
    box-shadow: 3px 2px 8px rgba(0, 0, 0, 0.09);

    position: fixed;
    bottom: 0;
    left: 0;
`;
