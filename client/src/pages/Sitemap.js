import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiFileText, FiPieChart, FiMail, FiShield, FiBook, FiMap } from 'react-icons/fi';
import SEO from '../components/SEO';

const SitemapContainer = styled.div`
  padding-top: 120px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[800]} 0%, ${props => props.theme.colors.primary[900]} 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
  }
`;

const ContentSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SitemapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[12]};
`;

const SitemapSection = styled.div`
  background: ${props => props.theme.colors.gray[50]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    
    svg {
      color: ${props => props.theme.colors.primary[600]};
    }
  }
`;

const SitemapLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: ${props => props.theme.spacing[3]};
    
    a {
      color: ${props => props.theme.colors.gray[700]};
      text-decoration: none;
      transition: color ${props => props.theme.transitions.fast};
      display: flex;
      align-items: center;
      gap: ${props => props.theme.spacing[2]};
      
      &:hover {
        color: ${props => props.theme.colors.primary[600]};
      }
    }
  }
`;

const ServiceLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[4]};
`;

const ServiceLink = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing[3]};
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  color: ${props => props.theme.colors.gray[700]};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary[300]};
    color: ${props => props.theme.colors.primary[600]};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

const ContactSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
  text-align: center;
`;

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.gray[200]};
  }
`;

const Sitemap = () => {
  return (
    <SitemapContainer>
      <SEO
        title="Sitemap - YD Advisory Financial Services"
        description="Navigate YD Advisory's website with our comprehensive sitemap. Find all pages, services, and resources organized for easy access."
        keywords="sitemap, website navigation, YD Advisory, financial services, pages, services, resources"
        url="https://ydadvisory.ae/sitemap"
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sitemap
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Navigate our website easily with our comprehensive sitemap. 
            Find all pages, services, and resources organized for your convenience.
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* Content Section */}
      <ContentSection>
        <SectionContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Website Navigation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore all sections of our website organized by category
            </motion.p>
          </SectionHeader>

          <SitemapGrid>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SitemapSection>
                <h3>
                  <FiHome />
                  Main Pages
                </h3>
                <SitemapLinks>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                </SitemapLinks>
              </SitemapSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <SitemapSection>
                <h3>
                  <FiBriefcase />
                  Our Services
                </h3>
                <ServiceLinks>
                  <ServiceLink to="/services/financial-modelling-forecasting">
                    Financial Modelling & Forecasting
                  </ServiceLink>
                  <ServiceLink to="/services/ma-advisory">
                    M&A Advisory
                  </ServiceLink>
                  <ServiceLink to="/services/transaction-advisory-due-diligence">
                    Transaction Advisory & Due Diligence
                  </ServiceLink>
                  <ServiceLink to="/services/fractional-cfo-board-support">
                    Fractional CFO & Board Support
                  </ServiceLink>
                  <ServiceLink to="/services/corporate-finance-cross-border">
                    Corporate Finance & Cross-Border Structuring
                  </ServiceLink>
                  <ServiceLink to="/services/feasibility-option-papers">
                    Feasibility & Option Papers
                  </ServiceLink>
                  <ServiceLink to="/services/specialized-valuation">
                    Specialized Valuation
                  </ServiceLink>
                </ServiceLinks>
              </SitemapSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SitemapSection>
                <h3>
                  <FiPieChart />
                  Tools & Resources
                </h3>
                <SitemapLinks>
                  <li><Link to="/calculator">YD Valuator</Link></li>
                  <li><Link to="/valuation-calculator">Business Valuation Calculator</Link></li>
                  <li><Link to="/transparency">Transparency & Disclaimers</Link></li>
                </SitemapLinks>
              </SitemapSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <SitemapSection>
                <h3>
                  <FiFileText />
                  Legal & Policies
                </h3>
                <SitemapLinks>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Terms of Service</Link></li>
                  <li><Link to="/cookies">Cookie Policy</Link></li>
                  <li><Link to="/sitemap">Sitemap</Link></li>
                </SitemapLinks>
              </SitemapSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <SitemapSection>
                <h3>
                  <FiUser />
                  About & Team
                </h3>
                <SitemapLinks>
                  <li><Link to="/about">About Yashaswi Das</Link></li>
                  <li><Link to="/team">Our Team</Link></li>
                  <li><Link to="/contact">Contact Information</Link></li>
                </SitemapLinks>
              </SitemapSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <SitemapSection>
                <h3>
                  <FiMail />
                  Contact & Support
                </h3>
                <SitemapLinks>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/contact">Get Consultation</Link></li>
                  <li><Link to="/contact">Schedule Meeting</Link></li>
                  <li><Link to="/contact">Support</Link></li>
                </SitemapLinks>
              </SitemapSection>
            </motion.div>
          </SitemapGrid>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <SitemapSection>
              <h3>
                <FiMap />
                Quick Navigation
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                Can't find what you're looking for? Use our search or contact us directly.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link 
                  to="/contact" 
                  style={{
                    background: 'linear-gradient(135deg, #14B8A6, #0F766E)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Contact Us
                </Link>
                <Link 
                  to="/services" 
                  style={{
                    background: 'transparent',
                    color: '#14B8A6',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    border: '2px solid #14B8A6',
                    transition: 'all 0.3s ease'
                  }}
                >
                  View Services
                </Link>
              </div>
            </SitemapSection>
          </motion.div>
        </SectionContent>
      </ContentSection>

      {/* Contact Section */}
      <ContactSection>
        <ContactContent>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Need Help Finding Something?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            If you can't find what you're looking for, our team is here to help. 
            Contact us for personalized assistance.
          </motion.p>
        </ContactContent>
      </ContactSection>
    </SitemapContainer>
  );
};

export default Sitemap;
