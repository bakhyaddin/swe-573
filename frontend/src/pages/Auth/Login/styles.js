import styled from 'styled-components';
import { Modal as AntdModal } from 'antd';

export const LoginStyled = styled.div`
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
            padding: 6%;
        };

        .card-header {
            color: ${({ theme }) => theme.main.colors.primaryColor};
        }

        .form {
            width: 100%
        }

        .buttons-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            .button {
                width: 100%;
                &.left{
                    margin-right: 5px;
                }
                &.right{
                    margin-left: 5px;
                }
            }
        }

        .forgot-password {
            margin-top: 10px;
        }
    }
`;

export const Modal = styled(AntdModal)`
    .buttons-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;

            .button {
                width: 100%;
                &.left{
                    margin-right: 5px;
                }
                &.right{
                    margin-left: 5px;
                }
            }
        }
`;
