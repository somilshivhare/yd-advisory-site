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
  FiAward,
  FiFileText,
  FiCheckCircle,
  FiLayers,
  FiSearch,
  FiSettings
} from 'react-icons/fi';
import SEO from '../components/SEO';
import { serviceSchema } from '../utils/structuredData';
import ValuationRequestForm from '../components/ValuationRequestForm';

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

const DeliverablesSection = styled.div`
  margin: ${props => props.theme.spacing[4]} 0;
  
  h4 {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.primary[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
    font-weight: ${props => props.theme.fontWeights.semibold};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    
    svg {
      color: ${props => props.theme.colors.primary[600]};
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      color: ${props => props.theme.colors.gray[600]};
      font-size: ${props => props.theme.fontSizes.xs};
      line-height: 1.5;
      margin-bottom: ${props => props.theme.spacing[1]};
      padding-left: ${props => props.theme.spacing[4]};
      position: relative;
      
      &::before {
        content: '•';
        color: ${props => props.theme.colors.primary[500]};
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
  }
`;

const UseCasesSection = styled.div`
  margin: ${props => props.theme.spacing[4]} 0;
  
  h4 {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.primary[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
    font-weight: ${props => props.theme.fontWeights.semibold};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    
    svg {
      color: ${props => props.theme.colors.primary[600]};
    }
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    font-size: ${props => props.theme.fontSizes.xs};
    line-height: 1.5;
    margin: 0;
  }
`;

const ToolsSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const ToolsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ToolCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.sm};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-weight: ${props => props.theme.fontWeights.semibold};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    
    li {
      color: ${props => props.theme.colors.gray[600]};
      font-size: ${props => props.theme.fontSizes.sm};
      line-height: 1.6;
      margin-bottom: ${props => props.theme.spacing[2]};
      padding-left: ${props => props.theme.spacing[4]};
      position: relative;
      
      &::before {
        content: '•';
        color: ${props => props.theme.colors.primary[500]};
        font-weight: bold;
        position: absolute;
        left: 0;
      }
    }
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

// Subscription/Pricing section
const PricingSection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  background: ${props => props.theme.colors.white};
`;

const PricingContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[3]};
    font-weight: ${props => props.theme.fontWeights.bold};
  }
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 800px;
    margin: 0 auto;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled.div`
  background: ${props => props.featured ? props.theme.colors.primary[50] : props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.featured ? props.theme.shadows.lg : props.theme.shadows.sm};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Price = styled.div`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary[800]};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: ${props => props.theme.spacing[3]} 0 ${props => props.theme.spacing[6]};
`;

const PricingButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin-top: auto;
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
  }
`;

const PricingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${props => props.theme.spacing[6]} 0;
  
  li {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const ServiceFormSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const ServiceFormHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-weight: 700;
  }
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;


const Services = () => {
  // Comprehensive Services Data
  const services = [
    {
      id: 1,
      title: 'Financial Modelling & Forecasting',
      description: 'Investor-grade three-statement models, unit economics, and multi-scenario analysis to quantify drivers, risk, and runway for boards and investors.',
      icon: FiBarChart,
      slug: 'financial-modelling-forecasting',
      image: '/images/services/img-1.jpg',
      deliverables: [
        'Fully linked model with clear inputs/outputs',
        'Scenario & sensitivity packs (including Monte-Carlo where useful)',
        'One-page board/IC memo with takeaways'
      ],
      useCases: 'Fundraising and lender packages · Budgeting & OKRs · M&A cases'
    },
    {
      id: 2,
      title: 'M&A Advisory (Buy- & Sell-Side)',
      description: 'End-to-end support—target screening, red-flag diligence, working-capital reviews, SPA/PPA modelling, and post-deal integration. We help you articulate value drivers and negotiate with confidence.',
      icon: FiBriefcase,
      slug: 'ma-advisory',
      image: '/images/services/img-2.jpg',
      deliverables: [
        'Diligence issue list & mitigation plan',
        'WC and net-debt bridges; SPA schedules & PPA models',
        'Integration workplan and day-1/100 priorities'
      ],
      useCases: 'Acquisitions, carve-outs, divestitures · Sell-side readiness'
    },
    {
      id: 3,
      title: 'Transaction Advisory & Due Diligence',
      description: 'Tight, focused QoE-style reviews and data-room prep to keep timelines on track and surprises low.',
      icon: FiSearch,
      slug: 'transaction-advisory-due-diligence',
      image: '/images/services/img-3.jpg',
      deliverables: [
        'Financial sweeps (revenue quality, margins, WC)',
        'Red flags, adjustments, and SPA implications',
        'Vendor/confirmatory DD support'
      ],
      useCases: 'Pre-acquisition analysis · Vendor due diligence · Quality of Earnings reviews'
    },
    {
      id: 4,
      title: 'Fractional CFO & Board Support',
      description: 'On-demand senior finance leadership—KPI dashboards, capital strategy, board packs, and fair-value roll-forwards—without full-time overhead.',
      icon: FiUsers,
      slug: 'fractional-cfo-board-support',
      image: '/images/services/img-4.jpg',
      deliverables: [
        'Monthly/quarterly KPI & cash dashboards',
        'Investor update pack and board memo',
        '"Hotline" support for negotiations and pivots'
      ],
      useCases: 'Growth-stage companies · Board reporting · Capital strategy · Investor relations'
    },
    {
      id: 5,
      title: 'Corporate Finance & Cross-Border Structuring',
      description: 'Entity maps and holding structures aligned with governance and tax considerations for expansions and cross-border deals.',
      icon: FiGlobe,
      slug: 'corporate-finance-cross-border',
      image: '/images/services/img-5.jpg',
      deliverables: [
        'Structure options, pros/cons, and cost/benefit',
        'Flow-of-funds & substance checklist',
        'Implementation roadmap'
      ],
      useCases: 'International expansion · Tax optimization · Holding company structures'
    },
    {
      id: 6,
      title: 'Feasibility & Option Papers',
      description: 'Market-driven go/no-go analysis with ROI scenarios and risk flags—so decisions are quick, transparent, and defensible.',
      icon: FiTarget,
      slug: 'feasibility-option-papers',
      image: '/images/services/img-6.jpg',
      deliverables: [
        'TAM/SAM/SOM & competitor scan',
        'Economics, scenarios, and sensitivities',
        'Decision memo for board/IC'
      ],
      useCases: 'New market entry · Product launches · Strategic pivots · Investment decisions'
    },
    {
      id: 7,
      title: 'Specialized Valuation',
      description: 'Targeted workstreams including IP/intangibles, Purchase Price Allocation (PPA), and digital assets where relevant—always with clear assumptions and defensible methods.',
      icon: FiDollarSign,
      slug: 'specialized-valuation',
      image: '/images/services/img-1.jpg',
      deliverables: [
        'IP and intangible asset valuations',
        'Purchase Price Allocation (PPA) models',
        'Digital asset and crypto valuations',
        'Fair value assessments for financial reporting'
      ],
      useCases: 'M&A transactions · Financial reporting · IP monetization · Digital asset portfolios'
    }
  ];

  // Priority: Business Valuation, Financial Modeling & Forecasting, Fractional CFO & Board Support, M&A Advisory
  const priorityOrder = [
    'business valuation',
    'financial modeling & forecasting',
    'fractional cfo & board support',
    'm&a advisory'
  ];
  const titleAliases = {
    'specialized valuation': 'business valuation',
    'financial modelling & forecasting': 'financial modeling & forecasting',
    'fractional cfo & board support': 'fractional cfo & board support',
    'm&a advisory (buy- & sell-side)': 'm&a advisory'
  };
  const prioritizedServices = [...services].sort((a, b) => {
    const aKey = (titleAliases[a.title.toLowerCase()] || a.title.toLowerCase());
    const bKey = (titleAliases[b.title.toLowerCase()] || b.title.toLowerCase());
    const aIdx = priorityOrder.indexOf(aKey);
    const bIdx = priorityOrder.indexOf(bKey);
    const aPriority = aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx;
    const bPriority = bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.id - b.id;
  });

  return (
    <ServicesContainer>
      <SEO
        title="Financial Services - YD Advisory Dubai"
        description="Comprehensive financial services including Financial Modelling & Forecasting, M&A Advisory, Transaction Advisory & Due Diligence, Fractional CFO & Board Support, Corporate Finance & Cross-Border Structuring, Feasibility & Option Papers, and Specialized Valuation. Expert guidance across UAE, India, Singapore, and more."
        keywords="financial services Dubai, financial modeling Dubai, M&A advisory Dubai, transaction advisory UAE, fractional CFO Dubai, corporate finance UAE, feasibility studies Dubai, specialized valuation UAE"
        url="https://ydadvisory.ae/services"
        structuredData={services.map(service => serviceSchema(service))}
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            YD Advisory Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We deliver comprehensive financial advisory services that turn analysis into action—built to hold up in boardrooms and negotiations. All work is IVSC-aligned and audit-ready, with clear assumptions, sensitivities, and executive summaries.
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* Services Section */}
      <CategorySection isEven={false}>
        <SectionContent>
          <CategoryHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Comprehensive financial advisory services designed to support your business growth, strategic decisions, and investment objectives.
            </motion.p>
          </CategoryHeader>

          <ServicesGrid>
            {prioritizedServices.map((service, index) => (
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
                    
                    <DeliverablesSection>
                      <h4>
                        <FiCheckCircle />
                        Deliverables
                      </h4>
                      <ul>
                        {service.deliverables.map((deliverable, idx) => (
                          <li key={idx}>{deliverable}</li>
                        ))}
                      </ul>
                    </DeliverablesSection>

                    <UseCasesSection>
                      <h4>
                        <FiTarget />
                        When it's used
                      </h4>
                      <p>{service.useCases}</p>
                    </UseCasesSection>

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

      {/* Pricing Plans Section */}
      <PricingSection>
        <PricingContent>
          <PricingHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Service Packages
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Choose a package that fits your current stage. All work is senior‑led and audit‑ready.
            </motion.p>
          </PricingHeader>

          <PricingGrid>
            <PricingCard>
              <h3 style={{ margin: 0, color: '#134E48' }}>Valuation Basic</h3>
              <p style={{ color: '#6B7280', marginTop: 4 }}>For new businesses</p>
              <Price>From $1000</Price>
              <PricingList>
                <li>Business plan review</li>
                <li>Basic financial model</li>
                <li>3‑year forecasts</li>
              </PricingList>
              <PricingButton href="#service-form">I want it! <FiArrowRight /></PricingButton>
            </PricingCard>

            <PricingCard featured>
              <h3 style={{ margin: 0, color: '#134E48' }}>Valuation Advanced</h3>
              <p style={{ color: '#6B7280', marginTop: 4 }}>Complete solution for scaling businesses</p>
              <Price>From $1500</Price>
              <PricingList>
                <li>Includes all from Valuation Starter</li>
                <li>Advanced financial modelling</li>
                <li>Investor materials</li>
                <li>3× strategy sessions</li>
              </PricingList>
              <PricingButton href="#service-form">I want it! <FiArrowRight /></PricingButton>
            </PricingCard>

            <PricingCard>
              <h3 style={{ margin: 0, color: '#134E48' }}>Custom Advisory</h3>
              <p style={{ color: '#6B7280', marginTop: 4 }}>Personalized advisory services</p>
              <Price>Upon consultation</Price>
              <PricingList>
                <li>Everything from Forge Growth</li>
                <li>Strategic planning</li>
                <li>Custom KPIs & dashboards</li>
                <li>Ongoing support</li>
              </PricingList>
              <PricingButton href="#service-form">I want it! <FiArrowRight /></PricingButton>
            </PricingCard>
          </PricingGrid>
        </PricingContent>
      </PricingSection>

      {/* Embedded Valuation Form (from Contact page) */}
      <ServiceFormSection id="service-form">
        <PricingContent>
          <ServiceFormHeader>
            <h2>Request A Valuation</h2>
            <p>Submit your details and we’ll follow up within 48 hours with next steps or a complimentary valuation.</p>
          </ServiceFormHeader>
          <ValuationRequestForm onSubmit={async (data) => { console.log('Valuation request data:', data); }} />
        </PricingContent>
      </ServiceFormSection>

      {/* Tools, Standards & Assurance Section */}
      <ToolsSection>
        <ToolsContent>
          <CategoryHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Tools, Standards & Assurance
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We maintain the highest standards of quality and use industry-leading tools to deliver exceptional results.
            </motion.p>
          </CategoryHeader>

          <ToolsGrid>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ToolCard>
                <h3>Standards</h3>
                <ul>
                  <li>IVSC methodologies</li>
                  <li>Audit-ready documentation</li>
                  <li>Industry best practices</li>
                  <li>Regulatory compliance</li>
                </ul>
              </ToolCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ToolCard>
                <h3>Tooling</h3>
                <ul>
                  <li>S&P Capital IQ</li>
                  <li>ValuSource</li>
                  <li>Factiva</li>
                  <li>@Risk/Monte-Carlo simulations</li>
                </ul>
              </ToolCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ToolCard>
                <h3>Style</h3>
                <ul>
                  <li>Tailored, not templated</li>
                  <li>Senior-led approach</li>
                  <li>Boutique speed</li>
                  <li>Clear assumptions & sensitivities</li>
                </ul>
              </ToolCard>
            </motion.div>
          </ToolsGrid>
        </ToolsContent>
      </ToolsSection>


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