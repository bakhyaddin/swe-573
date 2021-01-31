import styled from 'styled-components';
import { BarChartAlt2 } from 'styled-icons/boxicons-solid';
import { LibraryAdd } from 'styled-icons/material-sharp';
import { PageMultiple } from 'styled-icons/foundation';
import { Search as SearchIcon } from 'styled-icons/evil';
import { ArrowLeftShort, PersonFill } from 'styled-icons/bootstrap';
import { DragHandle } from 'styled-icons/material/';
import { Minus as MinusIcon } from 'styled-icons/boxicons-regular/';
import { Cross } from 'styled-icons/icomoon/';

const COMMON_ICON_STYLE = (marginLeft, marginRight, width, color, drag) => `
        width: ${width || '25px'};
        margin-left: ${marginLeft ? '20px' : '0px'};
        margin-right: ${marginRight ? '20px' : '0px'};
        color: ${color || '#fff'};
        overflow: visible !important;
        cursor: ${drag && 'ns-resize'}

        // @media screen and (max-width: 767px) {
        //   width: ${width || '20px'};
        // }
    `;

export const TestBank = styled(BarChartAlt2)`
  ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)}
`;

export const CreateNewTest = styled(LibraryAdd)`
  ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)}
`;

export const Folders = styled(PageMultiple)`
  ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Search = styled(SearchIcon)`
 ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Profile = styled(PersonFill)`
 ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const ArrowLeft = styled(ArrowLeftShort)`
  ${({
    marginLeft, marginRight, width, color,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color)};
`;

export const Drag = styled(DragHandle)`
  ${({
    marginLeft, marginRight, width, color, drag,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color, drag)};
`;

export const Minus = styled(MinusIcon)`
  ${({
    marginLeft, marginRight, width, color, drag,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color, drag)};
`;

export const Delete = styled(Cross)`
  ${({
    marginLeft, marginRight, width, color, drag,
  }) => COMMON_ICON_STYLE(marginLeft, marginRight, width, color, drag)};
  cursor: pointer;
`;
