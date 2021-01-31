import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 5px 0 5px;

    background-color: white;
    border-color: none;
    box-shadow: ${({ theme }) => theme.main.boxShadow};
    border-radius: 4px;
    overflow: scroll;
    margin-bottom: 15px;

    
`;

export const Overview = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid ${({ theme }) => theme.main.primaryColorDark};

    h1{
        margin-block-end: 0px;
    }

    .ant-col-8{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const WordCloudContainer = styled.div`
    display: flex;
    flex-flow: column;
    overflow: scroll;
    padding: 15px 0px;

    img{
        width: 100%
    }
`;

export const GraphContainer = styled.div`
    display: flex;
    flex-flow: column;
    overflow: scroll;
    padding: 15px 0px;

    img{
        width: 100%
    }
`;
