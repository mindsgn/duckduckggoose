import styled from 'styled-components';
import { MOBILE_S, MOBILE_M, MOBILE_L, TABLET, LAPTOP_S, LAPTOP_L, DESKTOP } from './../redux/constant'

const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${MOBILE_S}) {
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: ${MOBILE_M}) {
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: ${MOBILE_L}) {
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: ${TABLET}) {
    flex-direction: row;
    width: 80%;
  }

  @media (min-width: ${LAPTOP_S}) {
    flex-direction: row;
    width: 70%;
  }

  @media (min-width: ${LAPTOP_L}) {
    flex-direction: row;
    width: 60%;
  }

  @media (min-width: ${DESKTOP}) {
    flex-direction: row;
    width: 50%;
  }
`;

export default RowStyle;
