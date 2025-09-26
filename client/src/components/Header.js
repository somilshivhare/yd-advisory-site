import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiMail, FiClock, FiLinkedin } from 'react-icons/fi';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.tooltip};
  background: ${props => props.scrolled ? 'rgba(19, 78, 74, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all ${props => props.theme.transitions.base};
  border-bottom: ${props => props.scrolled ? `1px solid ${props.theme.colors.primary[200]}` : 'none'};
  width: 100%;
  max-width: 100%;
`;


const TopBar = styled.div`
  background: ${props => props.theme.colors.primary[800]};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[2]} 0;
  font-size: ${props => props.theme.fontSizes.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const ContactInfo = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: ${props => props.theme.spacing[4]};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  
  svg {
    color: ${props => props.theme.colors.primary[600]};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  
  a {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    transition: all ${props => props.theme.transitions.fast};
    padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
    border-radius: ${props => props.theme.borderRadius.md};
    
    svg {
      font-size: ${props => props.theme.fontSizes.lg};
    }
    
    span {
      font-size: ${props => props.theme.fontSizes.sm};
      font-weight: ${props => props.theme.fontWeights.medium};
    }
    
    &:hover {
      color: ${props => props.theme.colors.primary[300]};
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
  }
`;

const MainHeader = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} 0;
  box-shadow: ${props => props.scrolled ? props.theme.shadows.md : 'none'};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[3]} 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing[3]};
    flex-wrap: nowrap;
    min-width: 0;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  text-decoration: none;
  flex-shrink: 0;
  min-width: 0;
  
  img {
    height: 50px;
    width: auto;
    max-width: 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing[2]};
    
    img {
      height: 40px;
    }
  }
`;

const LogoText = styled.div`
  h1 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary[700]};
    margin: 0;
    line-height: 1;
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.gray[600]};
    margin: 0;
    font-weight: ${props => props.theme.fontWeights.medium};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    h1 {
      font-size: ${props => props.theme.fontSizes.xl};
    }
    
    p {
      font-size: ${props => props.theme.fontSizes.xs};
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${props => props.theme.spacing[6]};
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.gray[700]};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  padding: ${props => props.theme.spacing[2]} 0;
  transition: color ${props => props.theme.transitions.fast};
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary[600]};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary[600]};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${props => props.theme.colors.primary[500]};
    }
  }
`;

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
  font-size: ${props => props.theme.fontSizes.sm};
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.gray[700]};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  flex-shrink: 0;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary[600]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xl};
    padding: ${props => props.theme.spacing[1]};
    min-width: 40px;
    min-height: 40px;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.primary[900]};
  z-index: 9999;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[4]};
  overflow-y: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[3]};
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

const MobileLogo = styled.div`
  h2 {
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    h2 {
      font-size: ${props => props.theme.fontSizes.xl};
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary[800]};
    color: ${props => props.theme.colors.primary[300]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xl};
    padding: ${props => props.theme.spacing[1]};
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing[3]};
  }
`;

const MobileNavLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  display: block;
  padding: ${props => props.theme.spacing[3]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.primary[700]};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary[300]};
    padding-left: ${props => props.theme.spacing[2]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.base};
    padding: ${props => props.theme.spacing[2]} 0;
  }
`;

const MobileCTAButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.lg};
  text-align: center;
  display: block;
  margin-top: ${props => props.theme.spacing[6]};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes.base};
    margin-top: ${props => props.theme.spacing[4]};
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer scrolled={isScrolled}>
      <TopBar>
        <TopBarContent>
          <ContactInfo>
            <ContactItem>
              <FiPhone />
              <span>+971-528477349</span>
            </ContactItem>
            <ContactItem>
              <FiMail />
              <span>Yashaswi.das@ydadvisory.ae</span>
            </ContactItem>
          </ContactInfo>
          <SocialLinks>
            <a href="https://www.linkedin.com/in/yashaswi-das/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
          </SocialLinks>
        </TopBarContent>
      </TopBar>

      <MainHeader>
        <HeaderContent>
          <Logo to="/">
            <img 
              src="/images/logo/logo.png" 
              alt="YD Advisory Logo" 
              style={{ 
                height: '60px', 
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Logo>

          <Navigation>
            <NavList>
              <NavItem>
                <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/services" className={location.pathname.startsWith('/services') ? 'active' : ''}>
                  Services
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>
                  Blog
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/calculator" className={location.pathname === '/calculator' ? 'active' : ''}>
                  YD Valuator
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/transparency" className={location.pathname === '/transparency' ? 'active' : ''}>
                  Transparency
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                  Contact
                </NavLink>
              </NavItem>
            </NavList>
          </Navigation>

          <CTAButton to="/contact">
            Get Consultation
          </CTAButton>

          <MobileMenuButton onClick={toggleMobileMenu}>
            <FiMenu />
          </MobileMenuButton>
        </HeaderContent>
      </MainHeader>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenuHeader>
              <MobileLogo>
                <h2>YD Advisory</h2>
              </MobileLogo>
              <CloseButton onClick={toggleMobileMenu}>
                <FiX />
              </CloseButton>
            </MobileMenuHeader>
            <MobileNavList>
              <MobileNavItem>
                <MobileNavLink to="/">Home</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/about">About</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/services">Services</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/blog">Blog</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/calculator">YD Valuator</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/transparency">Transparency</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/contact">Contact</MobileNavLink>
              </MobileNavItem>
            </MobileNavList>
            
            <MobileCTAButton to="/contact">
              Get Free Consultation
            </MobileCTAButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
