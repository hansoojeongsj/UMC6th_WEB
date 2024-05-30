import styled from 'styled-components';

const StyledFooter = styled.footer`
  color: white;
  text-align: center;
  padding-bottom: 20px;
  bottom: 0;
  width: 100%;
  margin-top: 50px;
`;

const FooterText = styled.p`
  margin: 0;
  @media (max-width: 450px) {
    font-size: 13px;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterText>Made by 크리</FooterText>
      <FooterText>&copy; 2024 크리무비 All Rights Reserved.</FooterText>
    </StyledFooter>
  );
}

export default Footer;
