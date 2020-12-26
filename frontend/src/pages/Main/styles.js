import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: ${({ theme }) => theme.mainPage.padding}
`;
