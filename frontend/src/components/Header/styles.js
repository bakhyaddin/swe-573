import styled from 'styled-components';
import { Row } from 'antd';

export default styled(Row)`
    position: fixed;
    top: 0;
    left: 0;
    height: ${({ theme }) => theme.header.height};
    border-bottom: solid black 1px;
    width: 100vw;

`;
