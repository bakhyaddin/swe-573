import styled from 'styled-components';
import { Search as SearchIcon } from 'styled-icons/evil';
import {
  Minus as MinusIcon, Plus as PlusIcon, User, LogOutCircle,
} from 'styled-icons/boxicons-regular/';
import { Cross } from 'styled-icons/icomoon/';
import { Results as RS } from 'styled-icons/foundation/';

const COMMON_ICON_STYLE = (marginLeft, marginRight, width, color) => `
        width: ${width || '25px'};
        margin-left: ${marginLeft ? '20px' : '0px'};
        margin-right: ${marginRight ? '20px' : '0px'};
        color: ${color || '#fff'};
        overflow: visible !important;
        cursor: "pointer"

        // @media screen and (max-width: 767px) {
        //   width: ${width || '20px'};
        // }
    `;

export const Search = styled(SearchIcon)`
 ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Profile = styled(User)`
 ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Minus = styled(MinusIcon)`
  ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Plus = styled(PlusIcon)`
  ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Results = styled(RS)`
  ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Logout = styled(LogOutCircle)`
  ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Delete = styled(Cross)`
  ${({
    marginLeft, marginRight, width, color, drag,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color, drag)};
  cursor: pointer;
`;
