import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBook, FiShield, FiSettings, FiEye, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import SEO from '../components/SEO';

const CookieContainer = styled.div`
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
  max-width: 1000px;
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

const CookieSection = styled.div`
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    
    svg {
      color: ${props => props.theme.colors.primary[600]};
    }
  }
  
  p {
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.7;
    margin-bottom: ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes.base};
  }
  
  ul {
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.7;
    margin: ${props => props.theme.spacing[4]} 0;
    padding-left: ${props => props.theme.spacing[6]};
    
    li {
      margin-bottom: ${props => props.theme.spacing[2]};
    }
  }
`;

const CookieTable = styled.div`
  background: ${props => props.theme.colors.gray[50]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  margin: ${props => props.theme.spacing[6]} 0;
`;

const TableHeader = styled.div`
  background: ${props => props.theme.colors.primary[100]};
  padding: ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary[800]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[2]};
  }
`;

const TableRow = styled.div`
  padding: ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[2]};
  }
  
  .cookie-name {
    font-weight: ${props => props.theme.fontWeights.semibold};
    color: ${props => props.theme.colors.primary[800]};
  }
  
  .cookie-purpose {
    color: ${props => props.theme.colors.gray[700]};
  }
  
  .cookie-duration {
    color: ${props => props.theme.colors.gray[600]};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const CookiePolicy = () => {
  return (
    <CookieContainer>
      <SEO
        title="Cookie Policy - YD Advisory Financial Services"
        description="Learn about how YD Advisory uses cookies and similar technologies on our website. Understand your choices and control over cookie settings."
        keywords="cookie policy, cookies, tracking, YD Advisory, website cookies, data collection, privacy settings"
        url="https://ydadvisory.ae/cookies"
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Cookie Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            This policy explains how we use cookies and similar technologies on 
            our website to enhance your experience.
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
              Our Cookie Usage
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We use cookies to improve your browsing experience and provide 
              personalized content and services.
            </motion.p>
          </SectionHeader>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CookieSection>
              <h3>
                <FiBook />
                What Are Cookies?
              </h3>
              <p>
                Cookies are small text files that are stored on your device when you 
                visit our website. They help us remember your preferences and improve 
                your experience by:
              </p>
              <ul>
                <li>Remembering your login status and preferences</li>
                <li>Analyzing how you use our website</li>
                <li>Providing personalized content and recommendations</li>
                <li>Improving website performance and functionality</li>
                <li>Enabling social media features and sharing</li>
              </ul>
            </CookieSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <CookieSection>
              <h3>
                <FiShield />
                Types of Cookies We Use
              </h3>
              <p>
                We use different types of cookies for various purposes:
              </p>
              
              <CookieTable>
                <TableHeader>
                  <div>Cookie Type</div>
                  <div>Purpose</div>
                  <div>Duration</div>
                </TableHeader>
                <TableRow>
                  <div className="cookie-name">Essential Cookies</div>
                  <div className="cookie-purpose">Required for basic website functionality</div>
                  <div className="cookie-duration">Session</div>
                </TableRow>
                <TableRow>
                  <div className="cookie-name">Analytics Cookies</div>
                  <div className="cookie-purpose">Help us understand website usage and performance</div>
                  <div className="cookie-duration">2 years</div>
                </TableRow>
                <TableRow>
                  <div className="cookie-name">Preference Cookies</div>
                  <div className="cookie-purpose">Remember your settings and preferences</div>
                  <div className="cookie-duration">1 year</div>
                </TableRow>
                <TableRow>
                  <div className="cookie-name">Marketing Cookies</div>
                  <div className="cookie-purpose">Used for targeted advertising and content</div>
                  <div className="cookie-duration">6 months</div>
                </TableRow>
              </CookieTable>
            </CookieSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CookieSection>
              <h3>
                <FiSettings />
                Managing Your Cookie Preferences
              </h3>
              <p>
                You have control over cookies and can manage your preferences:
              </p>
              <ul>
                <li><strong>Browser Settings:</strong> Most browsers allow you to control cookies through settings</li>
                <li><strong>Cookie Banner:</strong> Use our cookie consent banner to choose which cookies to accept</li>
                <li><strong>Opt-out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
                <li><strong>Delete Cookies:</strong> You can delete existing cookies from your browser</li>
              </ul>
              <p>
                <strong>Note:</strong> Disabling certain cookies may affect website functionality 
                and your user experience.
              </p>
            </CookieSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <CookieSection>
              <h3>
                <FiEye />
                Third-Party Cookies
              </h3>
              <p>
                We may use third-party services that set their own cookies:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Media:</strong> For social sharing and login features</li>
                <li><strong>Advertising Networks:</strong> For targeted advertising (with consent)</li>
                <li><strong>Security Services:</strong> For fraud prevention and security monitoring</li>
              </ul>
              <p>
                These third-party cookies are subject to their respective privacy policies.
              </p>
            </CookieSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <CookieSection>
              <h3>
                <FiCheckCircle />
                Your Rights
              </h3>
              <p>
                Under applicable data protection laws, you have the right to:
              </p>
              <ul>
                <li>Be informed about cookie usage</li>
                <li>Give or withdraw consent for non-essential cookies</li>
                <li>Access information about cookies we use</li>
                <li>Request deletion of cookie data</li>
                <li>Object to certain types of cookie processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </CookieSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <CookieSection>
              <h3>
                <FiAlertTriangle />
                Updates to This Policy
              </h3>
              <p>
                We may update this Cookie Policy from time to time to reflect changes 
                in our practices or applicable laws. We will notify you of any 
                significant changes by posting the updated policy on our website.
              </p>
              <p>
                <strong>Last Updated:</strong> December 2024
              </p>
            </CookieSection>
          </motion.div>
        </SectionContent>
      </ContentSection>
    </CookieContainer>
  );
};

export default CookiePolicy;
