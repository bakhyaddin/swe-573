import styled from 'styled-components';
import { Row } from 'antd';

export default styled(Row)`
    position: fixed;
    top: 0;
    left: 0;
    height: ${({ theme }) => theme.header.height};
    border-bottom: solid black 1px;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding-left: ${({ ismobile }) => !ismobile && '260px'};
    border-bottom: 1px solid ${({ theme }) => theme.main.colors.borderColor};
    box-shadow: ${({ theme }) => `${theme.main.boxShadow} ${theme.main.colors.borderColor}`};
    background-color: ${({ theme, ismobile }) => (ismobile ? theme.main.colors.primaryColorLight : 'white')};
    color: ${({ ismobile }) => (ismobile ? 'white' : 'black')};

    .text{
        margin: 0px;
    }
`;
