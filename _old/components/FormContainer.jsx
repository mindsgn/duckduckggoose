import styled from "styled-components";
import {
  MOBILE_S,
  MOBILE_M,
  MOBILE_L,
  TABLET,
  LAPTOP_S,
  LAPTOP_L,
  DESKTOP,
} from "../../redux/constant";

const ContainerStyle = styled.div`
  background: ${(props) => (props.background ? "white" : "none")};
  border-radius: 15px;
  padding: 20px;

  @media (min-width: ${MOBILE_S}) {
    width: 100%;
  }

  @media (min-width: ${MOBILE_M}) {
    flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};
    width: 100%;
  }

  @media (min-width: ${MOBILE_L}) {
    flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};
    width: 100%;
  }

  @media (min-width: ${TABLET}) {
    flex-direction: row;
    width: 100%;
  }

  @media (min-width: ${LAPTOP_S}) {
    flex-direction: row;
    width: 100%;
  }

  @media (min-width: ${LAPTOP_L}) {
    flex-direction: row;
    width: 100%;
  }

  @media (min-width: ${DESKTOP}) {
    flex-direction: row;
    width: 50%;
  }
`;

export default ContainerStyle;
