import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiTrendingUp, 
  FiShield, 
  FiTarget, 
  FiDollarSign, 
  FiPieChart, 
  FiBriefcase,
  FiUsers,
  FiBarChart,
  FiBuilding,
  FiGlobe,
  FiAward
} from 'react-icons/fi';
import SEO from '../components/SEO';
import { serviceSchema } from '../utils/structuredData';

const ServicesContainer = styled.div`
  padding-top: 120px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[800]} 0%, ${props => props.theme.colors.primary[900]} 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/service-grid-bg.jpg') center/cover;
    opacity: 0.1;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  position: relative;
  z-index: 1;
  
  h1 {
    font-size: ${props => props.theme.fontSizes['6xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    font-weight: ${props => props.theme.fontWeights.bold};
    
    @media (max-width: ${props => props.theme.breakpoints.xl}) {
      font-size: ${props => props.theme.fontSizes['5xl']};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
    max-width: 900px;
    margin: 0 auto;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }
`;

const CategorySection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  background: ${props => props.isEven ? props.theme.colors.gray[50] : props.theme.colors.white};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
    border-radius: ${props => props.theme.borderRadius.full};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[16]} 0;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const CategoryHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[16]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
    font-weight: ${props => props.theme.fontWeights.bold};
    
    @media (max-width: ${props => props.theme.breakpoints.xl}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.6;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }
`;


const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.theme.spacing[6]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing[6]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing[4]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[4]};
  }
`;

const ServiceCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 0;
  text-align: center;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.sm};
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary[300]};
  }
`;

const ServiceImage = styled.div`
  width: 100%;
  height: 180px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(15, 118, 110, 0.5));
  }
  
  svg {
    position: relative;
    z-index: 2;
    font-size: ${props => props.theme.fontSizes['3xl']};
    color: ${props => props.theme.colors.white};
  }
`;

const ServiceContent = styled.div`
  padding: ${props => props.theme.spacing[6]};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[3]};
    line-height: 1.4;
    font-weight: ${props => props.theme.fontWeights.semibold};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes.sm};
    flex: 1;
  }
`;

const ServiceLink = styled(Link)`
  color: ${props => props.theme.colors.primary[600]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  transition: color ${props => props.theme.transitions.fast};
  font-size: ${props => props.theme.fontSizes.sm};
  
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const CtaSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
  text-align: center;
`;

const CtaContent = styled.div`
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

const CtaButton = styled(Link)`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary[700]};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.lg};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  transition: all ${props => props.theme.transitions.base};
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const StatsSection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  background: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[16]} 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing[12]};
  
  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    gap: ${props => props.theme.spacing[8]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing[8]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[6]};
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[8]};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    background: ${props => props.theme.colors.white};
  }
  
  .number {
    font-size: ${props => props.theme.fontSizes['5xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary[700]};
    margin-bottom: ${props => props.theme.spacing[3]};
    line-height: 1;
    
    @media (max-width: ${props => props.theme.breakpoints.xl}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }
  
  .label {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[600]};
    font-weight: ${props => props.theme.fontWeights.medium};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }
`;

const Services = () => {
  // Services data for Companies
  const companyServices = [
    {
      id: 1,
      title: 'Business Valuations & 409A Valuation',
      description: 'Independent, audit-ready valuations built for fundraises, ESOPs, and compliance.',
      icon: FiDollarSign,
      slug: 'business-valuations-409a',
      image: '/images/services/img-1.jpg'
    },
    {
      id: 2,
      title: 'Advanced Financial Modelling & Forecasting',
      description: 'Investor-grade three-statement models, sensitivity scenarios, and unit economics.',
      icon: FiBarChart,
      slug: 'financial-modelling-forecasting',
      image: '/images/services/img-2.jpg'
    },
    {
      id: 3,
      title: 'Fundraising Support (Equity & Debt)',
      description: 'Pitch deck refinement, cap table modeling, and term sheet advisory.',
      icon: FiTrendingUp,
      slug: 'fundraising-support',
      image: '/images/services/img-3.jpg'
    },
    {
      id: 4,
      title: 'M&A Advisory',
      description: 'Red-flag diligence, working capital reviews, and value driver articulation.',
      icon: FiBriefcase,
      slug: 'ma-advisory',
      image: '/images/services/img-4.jpg'
    },
    {
      id: 5,
      title: 'Fractional CFO, Strategy & Board Support',
      description: 'On-demand finance leadership from board reporting to capital strategy.',
      icon: FiUsers,
      slug: 'fractional-cfo',
      image: '/images/services/img-5.jpg'
    },
    {
      id: 6,
      title: 'Feasibility & Option Papers',
      description: 'Market-driven analysis for go/no-go calls and strategic pivots.',
      icon: FiTarget,
      slug: 'feasibility-option-papers',
      image: '/images/services/img-6.jpg'
    }
  ];

  // Services data for Investors & Family Offices
  const investorServices = [
    {
      id: 7,
      title: 'Mergers & Acquisitions (M&A) Advisory',
      description: 'Acquisition and divestiture strategies, transaction support and due diligence.',
      icon: FiBriefcase,
      slug: 'ma-advisory-investors',
      image: '/images/services/img-1.jpg'
    },
    {
      id: 8,
      title: 'Investment & Financial Advisory',
      description: 'Portfolio management, private equity advisory, alternative investment evaluations.',
      icon: FiPieChart,
      slug: 'investment-financial-advisory',
      image: '/images/services/img-2.jpg'
    },
    {
      id: 9,
      title: 'Valuation Services',
      description: 'Business valuations for privately held assets, complex security valuations.',
      icon: FiDollarSign,
      slug: 'valuation-services',
      image: '/images/services/img-3.jpg'
    },
    {
      id: 10,
      title: 'Cross-Border Structuring & Tax Planning',
      description: 'Holding structures and entity maps designed for compliance and optimization.',
      icon: FiGlobe,
      slug: 'cross-border-structuring',
      image: '/images/services/img-4.jpg'
    },
    {
      id: 11,
      title: 'Succession & Legacy Planning',
      description: 'Valuation-led structuring to support intergenerational wealth transfers.',
      icon: FiAward,
      slug: 'succession-legacy-planning',
      image: '/images/services/img-5.jpg'
    }
  ];

  return (
    <ServicesContainer>
      <SEO
        title="Financial Services - YD Advisory Dubai"
        description="Comprehensive financial services for companies and investors. Business valuations, M&A advisory, fundraising support, financial modeling, and strategic planning. Expert guidance across UAE, India, Singapore, and more."
        keywords="financial services Dubai, business valuations UAE, M&A advisory Dubai, fundraising support UAE, financial modeling Dubai, strategic planning UAE, investment advisory Dubai"
        url="https://ydadvisory.ae/services"
        structuredData={companyServices.map(service => serviceSchema(service))}
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Financial Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive financial solutions designed to help companies and investors achieve their goals 
            with expert guidance and personalized strategies across the entire deal lifecycle.
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* For Companies Section */}
      <CategorySection isEven={false}>
        <SectionContent>
          <CategoryHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              For Companies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Helping founders, CFOs, and boards make confident financial decisions as they grow, raise, or exit.
            </motion.p>
          </CategoryHeader>


          <ServicesGrid>
            {companyServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard>
                   <ServiceImage image={service.image}>
                     <service.icon />
                   </ServiceImage>
                  <ServiceContent>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ServiceLink to={`/services/${service.slug}`}>
                      Learn More <FiArrowRight />
                    </ServiceLink>
                  </ServiceContent>
                </ServiceCard>
              </motion.div>
            ))}
          </ServicesGrid>
        </SectionContent>
      </CategorySection>

      {/* For Investors & Family Offices Section */}
      <CategorySection isEven={true}>
        <SectionContent>
          <CategoryHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              For Investors & Family Offices
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Supporting capital allocators across the deal lifecycle - from screening to stewardship.
            </motion.p>
          </CategoryHeader>


          <ServicesGrid>
            {investorServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard>
                   <ServiceImage image={service.image}>
                     <service.icon />
                   </ServiceImage>
                  <ServiceContent>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ServiceLink to={`/services/${service.slug}`}>
                      Learn More <FiArrowRight />
                    </ServiceLink>
                  </ServiceContent>
                </ServiceCard>
              </motion.div>
            ))}
          </ServicesGrid>
        </SectionContent>
      </CategorySection>

      {/* Statistics Section */}
      <StatsSection>
        <SectionContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{ fontSize: '2.5rem', color: '#0f766e', marginBottom: '1rem' }}>
              Our Impact
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Trusted by companies and investors worldwide to deliver exceptional financial advisory services.
            </p>
          </motion.div>
          
          <StatsGrid>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <StatCard>
                <div className="number">50+</div>
                <div className="label">Clients</div>
              </StatCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StatCard>
                <div className="number">$100M+</div>
                <div className="label">Capital Supported</div>
              </StatCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <StatCard>
                <div className="number">9+</div>
                <div className="label">Geographies</div>
              </StatCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <StatCard>
                <div className="number">9+</div>
                <div className="label">Sectors Covered</div>
              </StatCard>
            </motion.div>
          </StatsGrid>
        </SectionContent>
      </StatsSection>

      {/* CTA Section */}
      <CtaSection>
        <CtaContent>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Schedule a free consultation with our expert advisors and discover how 
            our services can help you achieve your financial goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <CtaButton to="/contact">
              Schedule Free Consultation <FiArrowRight />
            </CtaButton>
          </motion.div>
        </CtaContent>
      </CtaSection>
    </ServicesContainer>
  );
};

export default Services;