import { FooterWrapper, FooterContainer } from '../common/Grid';
const Footer = () => {
    return (
      <FooterWrapper>
        <FooterContainer>
          <p>상호명: Desk IT</p>
          <p>사업자번호: 123-45-67890</p>
          <p>대표자명: 000</p>
        </FooterContainer>
        <FooterContainer>
          <p>고객센터</p>
          <p>전화번호: 02-1234-5678</p>
          <p>이메일: support@desk-it.com</p>
        </FooterContainer>
        <FooterContainer>
          <p>기타 안내사항</p>
          <p>이용약관</p>
          <p>개인정보 처리방침</p>
        </FooterContainer>
      </FooterWrapper>
    );
  };
  
  export default Footer;
