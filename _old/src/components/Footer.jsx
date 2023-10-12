
import styled from 'styled-components'

const FooterStyle = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  color: white;
  background: none;
  padding: 5px;
  padding-left: 20px;
  align-items: center;
  display: flex;
  z-index: 100;
`;

function Footer() {
  return (
    <FooterStyle>
    </FooterStyle>
  );
}

export default Footer;
