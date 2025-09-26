import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiClock, FiLinkedin, FiCheck, FiX } from 'react-icons/fi';
import { newsletterService } from '../services/api';

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
      font-size: ${props => props.theme.fontSizes.sm};
      line-height: 1.4;
      display: block;
      
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
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
      background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

const MessageContainer = styled.div`
  margin-top: ${props => props.theme.spacing[3]};
  padding: ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  
  ${props => props.type === 'success' && `
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #22c55e;
  `}
  
  ${props => props.type === 'error' && `
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
  `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[4]};
  
  a {
    display: inline-flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    background: ${props => props.theme.colors.gray[800]};
    color: ${props => props.theme.colors.gray[300]};
    border-radius: 9999px;
    text-decoration: none;
    transition: all ${props => props.theme.transitions.fast};
    line-height: 1;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    svg {
      font-size: 1.2rem;
    }

    &:hover {
      background: ${props => props.theme.colors.primary[600]};
      color: ${props => props.theme.colors.white};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
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
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await newsletterService.subscribe(email);
      setMessage({ type: 'success', text: response.message });
      setEmail('');
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to subscribe to newsletter';
      
      if (error.message.includes('Network Error') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Unable to connect to server. Please try again later.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage(null);
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
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </FooterLogo>
            <p>
              Your trusted partner in financial excellence. We provide comprehensive 
              financial solutions tailored to your unique needs and goals.
            </p>
            <SocialLinks>
              <a href="https://www.linkedin.com/in/yashaswi-das/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FiLinkedin />
                <span>LinkedIn</span>
              </a>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Services</h3>
            <FooterLinks style={{ maxWidth: '280px' }}>
              <li><Link to="/services/business-valuations-409a">Business & Complex Valuations (incl. 409A)</Link></li>
              <li><Link to="/services/financial-modelling-forecasting">Financial Modelling & Forecasting</Link></li>
              <li><Link to="/services/ma-advisory">M&A Advisory (Buy- & Sell-Side)</Link></li>
              <li><Link to="/services/transaction-advisory-due-diligence">Transaction Advisory & Due Diligence</Link></li>
              <li><Link to="/services/fractional-cfo-board-support">Fractional CFO & Board Support</Link></li>
              <li><Link to="/services/corporate-finance-cross-border">Corporate Finance & Cross-Border Structuring</Link></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <div className="contact-item">
                <FiMapPin />
                <span>Level 41, Emirates Tower - DIFC,<br />Near Trade Center - Dubai, UAE</span>
              </div>
              <div className="contact-item">
                <FiPhone />
                <a href="tel:+971528477349" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <span>+971-528477349</span>
                </a>
              </div>
              <div className="contact-item">
                <FiMail />
                <a href="mailto:Yashaswi.das@ydadvisory.ae" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <span>Yashaswi.das@ydadvisory.ae</span>
                </a>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required 
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <FiArrowRight />
                  </>
                )}
              </button>
            </NewsletterForm>
            
            {message && (
              <MessageContainer type={message.type}>
                {message.type === 'success' ? <FiCheck /> : <FiX />}
                <span>{message.text}</span>
                <button 
                  onClick={clearMessage}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'inherit', 
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    padding: '4px'
                  }}
                >
                  <FiX />
                </button>
              </MessageContainer>
            )}
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2025 YD Advisory. All rights reserved.</p>
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
