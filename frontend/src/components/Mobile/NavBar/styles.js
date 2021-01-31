import styled from 'styled-components';

export default styled.div`
    width: 100vw;
    height: ${({ theme }) => theme.mobile.navBar.height};
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0% 5%;
    background-color: ${({ theme }) => theme.main.colors.primaryColorLight};
    z-index: 1000;

    .col-style {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    };

    .logo-container { 
        height: 30px;
        .logo {
            height: 100%;
        }
    }

`;
