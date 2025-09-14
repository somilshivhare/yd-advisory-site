import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.primary[900]};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0 ${props => props.theme.spacing[8]};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[12]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    font-weight: ${props => props.theme.fontWeights.semibold};
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.white};
  }
  
  p {
    color: ${props => props.theme.colors.gray[300]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[4]};
  
  div {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.bronze});
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.white};
    font-weight: bold;
    font-size: 20px;
  }
  
  h2 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.white};
    margin: 0;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: ${props => props.theme.spacing[2]};
    
    a {
      color: ${props => props.theme.colors.gray[300]};
      text-decoration: none;
      transition: color ${props => props.theme.transitions.fast};
      
      &:hover {
        color: ${props => props.theme.colors.primary[600]};
      }
    }
  }
`;

const ContactInfo = styled.div`
  .contact-item {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    margin-bottom: ${props => props.theme.spacing[3]};
    color: ${props => props.theme.colors.gray[300]};
    
    svg {
      color: ${props => props.theme.colors.primary[600]};
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[4]};
  
  input {
    flex: 1;
    padding: ${props => props.theme.spacing[3]};
    border: 1px solid ${props => props.theme.colors.gray[600]};
    border-radius: ${props => props.theme.borderRadius.md};
    background: ${props => props.theme.colors.gray[800]};
    color: ${props => props.theme.colors.white};
    
    &::placeholder {
      color: ${props => props.theme.colors.gray[400]};
    }
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary[600]};
    }
  }
  
  button {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
    color: ${props => props.theme.colors.white};
    border: none;
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    border-radius: ${props => props.theme.borderRadius.md};
    font-weight: ${props => props.theme.fontWeights.semibold};
    cursor: pointer;
    transition: all ${props => props.theme.transitions.fast};
    box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
      background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[4]};
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${props => props.theme.colors.gray[800]};
    color: ${props => props.theme.colors.gray[300]};
    border-radius: 50%;
    text-decoration: none;
    transition: all ${props => props.theme.transitions.fast};
    
    &:hover {
      background: ${props => props.theme.colors.primary[600]};
      color: ${props => props.theme.colors.white};
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray[700]};
  padding-top: ${props => props.theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing[4]};
    text-align: center;
  }
  
  p {
    color: ${props => props.theme.colors.gray[400]};
    margin: 0;
  }
  
  .footer-links {
    display: flex;
    gap: ${props => props.theme.spacing[6]};
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      gap: ${props => props.theme.spacing[4]};
    }
    
    a {
      color: ${props => props.theme.colors.gray[400]};
      text-decoration: none;
      transition: color ${props => props.theme.transitions.fast};
      
      &:hover {
        color: ${props => props.theme.colors.primary[600]};
      }
    }
  }
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterLogo>
              <img 
                src="/images/logo/logo.png" 
                alt="YD Advisory Logo" 
                style={{ 
                  height: '50px', 
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </FooterLogo>
            <p>
              Your trusted partner in financial excellence. We provide comprehensive 
              financial solutions tailored to your unique needs and goals.
            </p>
            <SocialLinks>
              <a href="https://linkedin.com/company/yd-advisory" aria-label="LinkedIn">
                <FiArrowRight />
              </a>
              <a href="https://twitter.com/ydadvisory" aria-label="Twitter">
                <FiArrowRight />
              </a>
              <a href="https://facebook.com/ydadvisory" aria-label="Facebook">
                <FiArrowRight />
              </a>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Services</h3>
            <FooterLinks>
              <li><Link to="/services/investment-management">Investment Management</Link></li>
              <li><Link to="/services/financial-planning">Financial Planning</Link></li>
              <li><Link to="/services/risk-assessment">Risk Assessment</Link></li>
              <li><Link to="/services/tax-planning">Tax Planning</Link></li>
              <li><Link to="/services/estate-planning">Estate Planning</Link></li>
              <li><Link to="/services/business-consulting">Business Consulting</Link></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <div className="contact-item">
                <FiMapPin />
                <span>Emirates Tower, Trade Centre -<br />DIFC, Dubai, UAE</span>
              </div>
              <div className="contact-item">
                <FiPhone />
                <span>+91 70576 73562</span>
              </div>
              <div className="contact-item">
                <FiMail />
                <span>yashaswi.das@ydadvisory.ae</span>
              </div>
              <div className="contact-item">
                <FiClock />
                <span>Mon-Fri: 9AM-6PM</span>
              </div>
            </ContactInfo>
            
            <h4 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '16px' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '14px', marginBottom: '12px' }}>
              Subscribe to get financial tips and updates.
            </p>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit">Subscribe</button>
            </NewsletterForm>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 YD Advisory. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
