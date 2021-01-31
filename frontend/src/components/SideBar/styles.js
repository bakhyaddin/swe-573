import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 260px;
    background-color: ${({ theme }) => theme.main.colors.primaryColorLight};
    z-index: 1000;
    box-shadow: 3px 2px 8px rgba(0, 0, 0, 0.09);

    .logo-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 15vh;
        .logo{
            height: 100%;
        }
    }

    .menu-items-container{
        padding-top: 20px;
    }
`;
