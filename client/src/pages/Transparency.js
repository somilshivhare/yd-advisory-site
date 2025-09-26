import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShield, FiFileText, FiAlertTriangle, FiCheckCircle, FiInfo, FiBook } from 'react-icons/fi';
import SEO from '../components/SEO';

const TransparencyContainer = styled.div`
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
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: ${props => props.theme.fontWeights.extrabold};
    letter-spacing: -0.015em;
    
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
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: ${props => props.theme.fontWeights.extrabold};
    letter-spacing: -0.01em;
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const DisclaimerCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  svg {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.primary[600]};
    flex-shrink: 0;
  }
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin: 0;
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: ${props => props.theme.fontWeights.bold};
  }
`;

const CardContent = styled.div`
  p {
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.7;
    margin-bottom: ${props => props.theme.spacing[4]};
    
    &:last-child {
      margin-bottom: 0;
    }
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

const ImportantNotice = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.primary[100]});
  border: 2px solid ${props => props.theme.colors.primary[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  margin: ${props => props.theme.spacing[8]} 0;
  
  h3 {
    color: ${props => props.theme.colors.primary[800]};
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[4]};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: ${props => props.theme.fontWeights.bold};
    
    svg {
      color: ${props => props.theme.colors.primary[600]};
    }
  }
  
  p {
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.7;
    margin: 0;
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
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: ${props => props.theme.fontWeights.extrabold};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.gray[200]};
  }
`;

const ContactButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
`;

const Transparency = () => {
  return (
    <TransparencyContainer>
      <SEO
        title="Transparency & Disclaimers - YD Advisory Financial Services"
        description="Learn about YD Advisory's transparency practices, regulatory compliance, and important disclaimers for our financial services in Dubai, UAE."
        keywords="transparency, disclaimers, financial services Dubai, regulatory compliance, YD Advisory, financial regulations UAE"
        url="https://ydadvisory.ae/transparency"
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transparency & Disclaimers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our commitment to transparency, regulatory compliance, and clear communication 
            in all our financial advisory services.
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
              Our Commitment to Transparency
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              At YD Advisory, we believe in maintaining the highest standards of transparency 
              and regulatory compliance in all our financial services.
            </motion.p>
          </SectionHeader>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <DisclaimerCard>
              <CardHeader>
                <FiShield />
                <h3>Regulatory Compliance</h3>
              </CardHeader>
              <CardContent>
                <p>
                  YD Advisory operates in full compliance with all applicable financial 
                  regulations in the United Arab Emirates. We are committed to maintaining 
                  the highest standards of professional conduct and regulatory adherence.
                </p>
                <p>
                  Our services are provided in accordance with UAE financial regulations, 
                  including but not limited to the UAE Central Bank regulations and 
                  Securities and Commodities Authority (SCA) guidelines.
                </p>
              </CardContent>
            </DisclaimerCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <DisclaimerCard>
              <CardHeader>
                <FiFileText />
                <h3>Service Disclaimers</h3>
              </CardHeader>
              <CardContent>
                <p>
                  The information provided by YD Advisory is for general informational 
                  purposes only and should not be considered as financial, investment, 
                  or professional advice. All financial decisions should be made after 
                  careful consideration of your individual circumstances and, where 
                  appropriate, consultation with qualified professionals.
                </p>
                <ul>
                  <li>Past performance does not guarantee future results</li>
                  <li>All investments carry risk of loss</li>
                  <li>Market conditions can change rapidly and affect investment outcomes</li>
                  <li>Currency fluctuations may impact international investments</li>
                </ul>
              </CardContent>
            </DisclaimerCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <DisclaimerCard>
              <CardHeader>
                <FiAlertTriangle />
                <h3>Risk Disclosure</h3>
              </CardHeader>
              <CardContent>
                <p>
                  All financial investments and advisory services carry inherent risks. 
                  Before making any investment decisions, please consider the following:
                </p>
                <ul>
                  <li>Market risk: The value of investments can go down as well as up</li>
                  <li>Liquidity risk: Some investments may be difficult to sell quickly</li>
                  <li>Credit risk: The possibility that a borrower may default on payments</li>
                  <li>Inflation risk: The purchasing power of money may decrease over time</li>
                  <li>Regulatory risk: Changes in laws and regulations may affect investments</li>
                </ul>
                <p>
                  We recommend that you carefully assess your risk tolerance and investment 
                  objectives before proceeding with any financial strategy.
                </p>
              </CardContent>
            </DisclaimerCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <DisclaimerCard>
              <CardHeader>
                <FiCheckCircle />
                <h3>Professional Standards</h3>
              </CardHeader>
              <CardContent>
                <p>
                  YD Advisory maintains the highest professional standards in all our 
                  client relationships. We are committed to:
                </p>
                <ul>
                  <li>Acting in the best interests of our clients at all times</li>
                  <li>Providing clear, accurate, and timely information</li>
                  <li>Maintaining strict confidentiality of client information</li>
                  <li>Disclosing any potential conflicts of interest</li>
                  <li>Continuing professional development and education</li>
                </ul>
              </CardContent>
            </DisclaimerCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <DisclaimerCard>
              <CardHeader>
                <FiBook />
                <h3>Legal Disclaimer</h3>
              </CardHeader>
              <CardContent>
                <p>
                  This website and its contents are provided on an "as is" basis. YD Advisory 
                  makes no representations or warranties of any kind, express or implied, 
                  regarding the accuracy, completeness, or suitability of the information 
                  contained herein.
                </p>
                <p>
                  YD Advisory shall not be liable for any direct, indirect, incidental, 
                  special, or consequential damages arising from the use of this website 
                  or the information contained herein.
                </p>
              </CardContent>
            </DisclaimerCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <ImportantNotice>
              <h3>
                <FiInfo />
                Important Notice
              </h3>
              <p>
                The information on this website is not intended for distribution to, or use by, 
                any person in any country or jurisdiction where such distribution or use would 
                be contrary to local law or regulation. If you are accessing this website from 
                outside the UAE, please ensure that you comply with all applicable local laws 
                and regulations.
              </p>
            </ImportantNotice>
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
            Questions About Our Services?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            If you have any questions about our transparency practices, disclaimers, 
            or would like to discuss our services in detail, we're here to help.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ContactButton>
              Contact Us Today
            </ContactButton>
          </motion.div>
        </ContactContent>
      </ContactSection>
    </TransparencyContainer>
  );
};

export default Transparency;
