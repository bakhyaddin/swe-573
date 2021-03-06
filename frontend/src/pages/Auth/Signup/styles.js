import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: ${({ theme }) => theme.main.colors.primaryColor};

    .card {
        height: 60%;
        width: 35%;
        align-items: center;
        justify-content: space-around;
        display: flex;
        flex-direction: column;
        padding: 2% 4%;
        background-color: #ffff;

        @media only screen and (max-width: 1024px) {
            width: 80%;
            height: 75%;
            padding: 6%;
        };

        .card-header {
            color: ${({ theme }) => theme.main.colors.primaryColor};
        }

        .form {
            width: 100%
        }

        .button {
            width: 100%;
        }
    }
`;
