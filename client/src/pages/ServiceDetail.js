import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiTrendingUp, 
  FiShield, 
  FiTarget, 
  FiDollarSign, 
  FiPieChart, 
  FiBriefcase,
  FiUsers,
  FiClock,
  FiAward,
  FiBarChart,
  FiMail,
  FiPhone,
  FiCalendar,
  FiGlobe
} from 'react-icons/fi';

const PageContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
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
    max-width: 800px;
    margin: 0 auto ${props => props.theme.spacing[8]};
  }
`;

const ServiceIcon = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[6]};
  backdrop-filter: blur(10px);
  
  svg {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.white};
  }
`;

const CategoryBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[4]};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ContentSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  margin-bottom: ${props => props.theme.spacing[16]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
`;

const ContentBlock = styled.div`
  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.7;
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[4]};
  
  svg {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[600]};
    margin-top: ${props => props.theme.spacing[1]};
    flex-shrink: 0;
  }
  
  span {
    color: ${props => props.theme.colors.gray[700]};
    font-weight: ${props => props.theme.fontWeights.medium};
    line-height: 1.6;
  }
`;

const ProcessSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[6]};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const StepTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
`;

const BenefitsSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const BenefitsGrid = styled.div`
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

const BenefitCard = styled.div`
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
  
  svg {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[600]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[3]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
  }
`;

const CtaSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
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
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[8]};
  }
`;

const CtaButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary[700]};
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  text-align: center;
  min-width: 200px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
    background: ${props => props.theme.colors.gray[100]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 250px;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: ${props => props.theme.colors.white};
  padding: 16px 32px;
  border: 2px solid ${props => props.theme.colors.white};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  min-width: 200px;
  
  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary[700]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 250px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing[8]};
  margin-top: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing[4]};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.gray[200]};
  
  svg {
    color: ${props => props.theme.colors.white};
  }
`;

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Service data - in a real app, this would come from an API
  const servicesData = {
    // FOR COMPANIES SERVICES
    'business-valuations-409a': {
      id: 1,
      title: 'Business Valuations & 409A Valuation',
      category: 'For Companies',
      description: 'Independent, audit-ready valuations built for fundraises, ESOPs, and compliance.',
      icon: FiDollarSign,
      features: [
        'Independent audit-ready valuations',
        '409A compliance valuations',
        'Fundraising support valuations',
        'ESOP valuations',
        'Fairness opinions',
        'Regulatory compliance support'
      ],
      process: [
        { step: 1, title: 'Initial Assessment', description: 'Analyze your business model, financials, and valuation requirements.' },
        { step: 2, title: 'Data Collection', description: 'Gather financial statements, market data, and business metrics.' },
        { step: 3, title: 'Valuation Analysis', description: 'Apply appropriate valuation methodologies and market comparables.' },
        { step: 4, title: 'Report Delivery', description: 'Provide comprehensive valuation report with audit-ready documentation.' }
      ],
      benefits: [
        { icon: FiShield, title: 'Audit Ready', description: 'Comprehensive documentation for audit and compliance requirements.' },
        { icon: FiTarget, title: 'Accurate Valuations', description: 'Independent, unbiased valuations using industry best practices.' },
        { icon: FiCheckCircle, title: 'Regulatory Compliance', description: 'Ensure compliance with 409A and other regulatory requirements.' }
      ]
    },
    'financial-modelling-forecasting': {
      id: 2,
      title: 'Advanced Financial Modelling & Forecasting',
      category: 'For Companies',
      description: 'Investor-grade three-statement models, sensitivity scenarios, and unit economics.',
      icon: FiBarChart,
      features: [
        'Three-statement financial models',
        'Sensitivity analysis and scenarios',
        'Unit economics modeling',
        'Cash flow forecasting',
        'Investor-grade presentations',
        'Scenario planning and stress testing'
      ],
      process: [
        { step: 1, title: 'Model Design', description: 'Design comprehensive financial model structure and assumptions.' },
        { step: 2, title: 'Data Integration', description: 'Integrate historical data and build forecasting framework.' },
        { step: 3, title: 'Scenario Analysis', description: 'Develop sensitivity scenarios and stress testing models.' },
        { step: 4, title: 'Model Validation', description: 'Validate model accuracy and provide training for ongoing use.' }
      ],
      benefits: [
        { icon: FiTrendingUp, title: 'Investor Ready', description: 'Professional-grade models that meet investor expectations.' },
        { icon: FiTarget, title: 'Strategic Planning', description: 'Data-driven insights for strategic decision making.' },
        { icon: FiShield, title: 'Risk Management', description: 'Comprehensive scenario analysis for risk assessment.' }
      ]
    },
    'fundraising-support': {
      id: 3,
      title: 'Fundraising Support (Equity & Debt)',
      category: 'For Companies',
      description: 'Pitch deck refinement, cap table modeling, and term sheet advisory to align with investor expectations.',
      icon: FiTrendingUp,
      features: [
        'Pitch deck development and refinement',
        'Cap table modeling and analysis',
        'Term sheet advisory and negotiation',
        'Investor presentation preparation',
        'Due diligence support',
        'Fundraising strategy development'
      ],
      process: [
        { step: 1, title: 'Strategy Development', description: 'Develop fundraising strategy and identify target investors.' },
        { step: 2, title: 'Materials Preparation', description: 'Create compelling pitch decks and financial materials.' },
        { step: 3, title: 'Investor Engagement', description: 'Support investor meetings and due diligence processes.' },
        { step: 4, title: 'Deal Execution', description: 'Negotiate terms and support closing of fundraising rounds.' }
      ],
      benefits: [
        { icon: FiTarget, title: 'Successful Fundraising', description: 'Maximize chances of successful capital raising.' },
        { icon: FiDollarSign, title: 'Optimal Terms', description: 'Negotiate favorable terms and valuations.' },
        { icon: FiUsers, title: 'Investor Relations', description: 'Build strong relationships with investors and stakeholders.' }
      ]
    },
    'ma-advisory': {
      id: 4,
      title: 'M&A Advisory',
      category: 'For Companies',
      description: 'Red-flag diligence, working capital reviews, due diligence support, and value driver articulation for partial or full exits.',
      icon: FiBriefcase,
      features: [
        'Red-flag due diligence',
        'Working capital analysis',
        'Value driver identification',
        'Exit strategy development',
        'Buyer identification and outreach',
        'Transaction support and negotiation'
      ],
      process: [
        { step: 1, title: 'Exit Readiness', description: 'Assess company readiness and identify value drivers.' },
        { step: 2, title: 'Market Positioning', description: 'Position company for optimal market reception.' },
        { step: 3, title: 'Buyer Engagement', description: 'Identify and engage with potential buyers or investors.' },
        { step: 4, title: 'Transaction Execution', description: 'Support due diligence and negotiate transaction terms.' }
      ],
      benefits: [
        { icon: FiDollarSign, title: 'Maximum Value', description: 'Optimize transaction value through strategic positioning.' },
        { icon: FiShield, title: 'Risk Mitigation', description: 'Identify and address potential transaction risks early.' },
        { icon: FiTarget, title: 'Smooth Process', description: 'Ensure efficient and successful transaction execution.' }
      ]
    },
    'fractional-cfo': {
      id: 5,
      title: 'Fractional CFO, Strategy & Board Support',
      category: 'For Companies',
      description: 'On-demand finance leadership - from board reporting to capital strategy.',
      icon: FiUsers,
      features: [
        'On-demand CFO services',
        'Board reporting and presentations',
        'Capital strategy development',
        'Financial planning and analysis',
        'Investor relations support',
        'Strategic financial guidance'
      ],
      process: [
        { step: 1, title: 'Assessment', description: 'Evaluate current financial function and identify needs.' },
        { step: 2, title: 'Strategy Development', description: 'Develop financial strategy and reporting framework.' },
        { step: 3, title: 'Implementation', description: 'Implement financial processes and reporting systems.' },
        { step: 4, title: 'Ongoing Support', description: 'Provide ongoing financial leadership and strategic guidance.' }
      ],
      benefits: [
        { icon: FiUsers, title: 'Expert Leadership', description: 'Access to senior financial expertise without full-time cost.' },
        { icon: FiTarget, title: 'Strategic Focus', description: 'Focus on strategic initiatives with professional financial support.' },
        { icon: FiTrendingUp, title: 'Growth Enablement', description: 'Enable growth through professional financial management.' }
      ]
    },
    'feasibility-option-papers': {
      id: 6,
      title: 'Feasibility & Option Papers',
      category: 'For Companies',
      description: 'Market-driven analysis for go/no-go calls, expansion decisions, and strategic pivots.',
      icon: FiTarget,
      features: [
        'Market feasibility analysis',
        'Go/no-go decision support',
        'Expansion strategy evaluation',
        'Strategic pivot analysis',
        'Market opportunity assessment',
        'Risk-benefit analysis'
      ],
      process: [
        { step: 1, title: 'Market Research', description: 'Conduct comprehensive market and competitive analysis.' },
        { step: 2, title: 'Financial Modeling', description: 'Develop financial models for different scenarios.' },
        { step: 3, title: 'Risk Assessment', description: 'Evaluate risks and opportunities for each option.' },
        { step: 4, title: 'Recommendation', description: 'Provide clear recommendations with supporting analysis.' }
      ],
      benefits: [
        { icon: FiTarget, title: 'Informed Decisions', description: 'Make data-driven strategic decisions with confidence.' },
        { icon: FiShield, title: 'Risk Mitigation', description: 'Identify and mitigate potential risks early.' },
        { icon: FiTrendingUp, title: 'Opportunity Maximization', description: 'Capitalize on market opportunities effectively.' }
      ]
    },
    // FOR INVESTORS & FAMILY OFFICES SERVICES
    'ma-advisory-investors': {
      id: 7,
      title: 'Mergers & Acquisitions (M&A) Advisory',
      category: 'For Investors & Family Offices',
      description: 'Acquisition and divestiture strategies, transaction support and due diligence, post-merger integration advisory.',
      icon: FiBriefcase,
      features: [
        'Acquisition strategy development',
        'Divestiture planning and execution',
        'Due diligence support',
        'Transaction structuring',
        'Post-merger integration',
        'Portfolio optimization'
      ],
      process: [
        { step: 1, title: 'Strategy Development', description: 'Develop acquisition or divestiture strategy aligned with portfolio goals.' },
        { step: 2, title: 'Target Identification', description: 'Identify and evaluate potential targets or buyers.' },
        { step: 3, title: 'Due Diligence', description: 'Conduct comprehensive due diligence and risk assessment.' },
        { step: 4, title: 'Transaction Execution', description: 'Support negotiation and execution of transactions.' }
      ],
      benefits: [
        { icon: FiTarget, title: 'Strategic Alignment', description: 'Ensure transactions align with investment strategy.' },
        { icon: FiDollarSign, title: 'Value Optimization', description: 'Maximize value through strategic transaction structuring.' },
        { icon: FiShield, title: 'Risk Management', description: 'Comprehensive due diligence to mitigate transaction risks.' }
      ]
    },
    'investment-financial-advisory': {
      id: 8,
      title: 'Investment & Financial Advisory',
      category: 'For Investors & Family Offices',
      description: 'Portfolio management & diversification strategies, private equity and venture capital advisory, alternative investment evaluations.',
      icon: FiPieChart,
      features: [
        'Portfolio management strategies',
        'Diversification optimization',
        'Private equity advisory',
        'Venture capital guidance',
        'Alternative investment evaluation',
        'Asset allocation strategies'
      ],
      process: [
        { step: 1, title: 'Portfolio Analysis', description: 'Analyze current portfolio composition and performance.' },
        { step: 2, title: 'Strategy Development', description: 'Develop investment strategy and allocation recommendations.' },
        { step: 3, title: 'Implementation', description: 'Support implementation of investment strategies.' },
        { step: 4, title: 'Monitoring', description: 'Ongoing portfolio monitoring and optimization.' }
      ],
      benefits: [
        { icon: FiTrendingUp, title: 'Optimized Returns', description: 'Maximize returns through strategic portfolio management.' },
        { icon: FiShield, title: 'Risk Diversification', description: 'Achieve optimal risk-adjusted returns through diversification.' },
        { icon: FiTarget, title: 'Strategic Focus', description: 'Align investments with long-term strategic objectives.' }
      ]
    },
    'valuation-services': {
      id: 9,
      title: 'Valuation Services',
      category: 'For Investors & Family Offices',
      description: 'Business valuations for privately held assets, complex security valuations, intellectual property valuations, purchase price allocation.',
      icon: FiDollarSign,
      features: [
        'Private asset valuations',
        'Complex security valuations',
        'Intellectual property valuations',
        'Purchase price allocation',
        'Portfolio company valuations',
        'Fair value assessments'
      ],
      process: [
        { step: 1, title: 'Asset Analysis', description: 'Analyze assets and determine appropriate valuation methodologies.' },
        { step: 2, title: 'Market Research', description: 'Conduct market research and comparable analysis.' },
        { step: 3, title: 'Valuation Modeling', description: 'Develop comprehensive valuation models and analysis.' },
        { step: 4, title: 'Report Delivery', description: 'Provide detailed valuation reports and documentation.' }
      ],
      benefits: [
        { icon: FiTarget, title: 'Accurate Valuations', description: 'Professional valuations using industry best practices.' },
        { icon: FiShield, title: 'Compliance Ready', description: 'Meet regulatory and reporting requirements.' },
        { icon: FiDollarSign, title: 'Informed Decisions', description: 'Make informed investment decisions with accurate valuations.' }
      ]
    },
    'cross-border-structuring': {
      id: 10,
      title: 'Cross-Border Structuring & Tax Planning',
      category: 'For Investors & Family Offices',
      description: 'Holding structures and entity maps designed for compliance and optimization.',
      icon: FiShield,
      features: [
        'Cross-border entity structuring',
        'Tax optimization strategies',
        'Compliance framework design',
        'Holding company structures',
        'International tax planning',
        'Regulatory compliance support'
      ],
      process: [
        { step: 1, title: 'Structure Analysis', description: 'Analyze current structure and identify optimization opportunities.' },
        { step: 2, title: 'Design Development', description: 'Design optimal cross-border structure and entity map.' },
        { step: 3, title: 'Implementation', description: 'Support implementation of new structure and entities.' },
        { step: 4, title: 'Ongoing Compliance', description: 'Provide ongoing compliance and optimization support.' }
      ],
      benefits: [
        { icon: FiShield, title: 'Tax Optimization', description: 'Minimize tax burden through strategic structuring.' },
        { icon: FiTarget, title: 'Compliance Assurance', description: 'Ensure compliance with international regulations.' },
        { icon: FiDollarSign, title: 'Cost Efficiency', description: 'Optimize operational costs and tax efficiency.' }
      ]
    },
    'succession-legacy-planning': {
      id: 11,
      title: 'Succession & Legacy Planning',
      category: 'For Investors & Family Offices',
      description: 'Valuation-led structuring to support intergenerational wealth transfers.',
      icon: FiUsers,
      features: [
        'Intergenerational wealth transfer',
        'Succession planning strategies',
        'Legacy structuring',
        'Family governance frameworks',
        'Wealth preservation strategies',
        'Tax-efficient transfers'
      ],
      process: [
        { step: 1, title: 'Family Assessment', description: 'Assess family structure, wealth, and succession goals.' },
        { step: 2, title: 'Strategy Development', description: 'Develop comprehensive succession and legacy strategy.' },
        { step: 3, title: 'Structure Implementation', description: 'Implement legal and financial structures for wealth transfer.' },
        { step: 4, title: 'Ongoing Management', description: 'Provide ongoing support for succession execution.' }
      ],
      benefits: [
        { icon: FiUsers, title: 'Family Harmony', description: 'Ensure smooth intergenerational wealth transfer.' },
        { icon: FiShield, title: 'Wealth Preservation', description: 'Protect and preserve family wealth across generations.' },
        { icon: FiTarget, title: 'Legacy Continuity', description: 'Maintain family legacy and values through structured planning.' }
      ]
    },
    'specialized-valuation': {
      id: 12,
      title: 'Specialized Valuation Services',
      category: 'For Companies',
      description: 'Expert valuations for complex assets, intellectual property, and unique business situations requiring specialized expertise.',
      icon: FiAward,
      features: [
        'Intellectual property valuations',
        'Complex asset valuations',
        'Startup and early-stage valuations',
        'Distressed company valuations',
        'Intangible asset valuations',
        'Special situation valuations',
        'Regulatory compliance valuations',
        'Litigation support valuations'
      ],
      process: [
        { step: 1, title: 'Asset Analysis', description: 'Analyze complex assets and determine appropriate valuation methodologies.' },
        { step: 2, title: 'Market Research', description: 'Conduct specialized market research and comparable analysis.' },
        { step: 3, title: 'Valuation Modeling', description: 'Develop sophisticated valuation models using specialized techniques.' },
        { step: 4, title: 'Expert Report', description: 'Deliver comprehensive valuation report with expert analysis and documentation.' }
      ],
      benefits: [
        { icon: FiAward, title: 'Expert Analysis', description: 'Specialized expertise for complex and unique valuation challenges.' },
        { icon: FiShield, title: 'Regulatory Compliance', description: 'Meet specific regulatory requirements and standards.' },
        { icon: FiTarget, title: 'Defensible Valuations', description: 'Robust, defensible valuations that withstand scrutiny.' },
        { icon: FiDollarSign, title: 'Accurate Assessment', description: 'Precise valuations for complex assets and situations.' }
      ]
    },
    'fractional-cfo-board-support': {
      id: 13,
      title: 'Fractional CFO & Board Support',
      category: 'For Companies',
      description: 'On-demand senior finance leadership providing strategic financial guidance, board reporting, and capital strategy development.',
      icon: FiUsers,
      features: [
        'Strategic financial planning and analysis',
        'Board reporting and investor relations',
        'Capital strategy and fundraising support',
        'Financial modeling and forecasting',
        'KPI dashboard development',
        'Cash flow management and optimization',
        'Financial process improvement',
        'M&A financial due diligence support',
        'Risk management and compliance',
        'Team building and mentoring'
      ],
      process: [
        { step: 1, title: 'Financial Assessment', description: 'Evaluate current financial function, processes, and identify improvement opportunities.' },
        { step: 2, title: 'Strategy Development', description: 'Develop comprehensive financial strategy aligned with business objectives and growth plans.' },
        { step: 3, title: 'Implementation', description: 'Implement financial processes, reporting systems, and establish key performance indicators.' },
        { step: 4, title: 'Ongoing Support', description: 'Provide continuous financial leadership, board support, and strategic guidance.' }
      ],
      benefits: [
        { icon: FiUsers, title: 'Expert Leadership', description: 'Access to senior financial expertise without full-time executive costs.' },
        { icon: FiTarget, title: 'Strategic Focus', description: 'Focus on strategic initiatives with professional financial support and guidance.' },
        { icon: FiTrendingUp, title: 'Growth Enablement', description: 'Enable sustainable growth through professional financial management and planning.' },
        { icon: FiShield, title: 'Risk Mitigation', description: 'Identify and mitigate financial risks through professional oversight and controls.' }
      ]
    },
    'transaction-advisory-due-diligence': {
      id: 14,
      title: 'Transaction Advisory & Due Diligence',
      category: 'For Companies',
      description: 'Comprehensive M&A support including financial due diligence, transaction structuring, and post-merger integration advisory.',
      icon: FiBriefcase,
      features: [
        'Financial due diligence and analysis',
        'Quality of earnings assessments',
        'Working capital analysis and optimization',
        'Transaction structuring and negotiation',
        'Buy-side and sell-side advisory',
        'Post-merger integration planning',
        'Synergy identification and quantification',
        'Risk assessment and mitigation',
        'Regulatory compliance review',
        'Valuation and pricing analysis'
      ],
      process: [
        { step: 1, title: 'Transaction Planning', description: 'Develop transaction strategy, identify key risks, and establish due diligence framework.' },
        { step: 2, title: 'Due Diligence', description: 'Conduct comprehensive financial, operational, and legal due diligence analysis.' },
        { step: 3, title: 'Structuring & Negotiation', description: 'Structure optimal transaction terms and support negotiation process.' },
        { step: 4, title: 'Integration Support', description: 'Provide post-transaction integration support and performance monitoring.' }
      ],
      benefits: [
        { icon: FiTarget, title: 'Successful Transactions', description: 'Maximize transaction success through comprehensive due diligence and strategic guidance.' },
        { icon: FiDollarSign, title: 'Value Optimization', description: 'Optimize transaction value through effective structuring and negotiation support.' },
        { icon: FiShield, title: 'Risk Mitigation', description: 'Identify and address potential transaction risks early in the process.' },
        { icon: FiCheckCircle, title: 'Smooth Execution', description: 'Ensure efficient and successful transaction execution with minimal disruption.' }
      ]
    },
    'corporate-finance-cross-border': {
      id: 15,
      title: 'Corporate Finance & Cross-Border Structuring',
      category: 'For Companies',
      description: 'Strategic corporate finance solutions and cross-border entity structuring for international expansion and tax optimization.',
      icon: FiGlobe,
      features: [
        'Cross-border entity structuring',
        'International tax planning and optimization',
        'Holding company structures',
        'Regulatory compliance framework',
        'Capital structure optimization',
        'International financing solutions',
        'Transfer pricing strategies',
        'Double taxation treaty optimization',
        'Subsidiary management and governance',
        'Exit strategy planning'
      ],
      process: [
        { step: 1, title: 'Structure Analysis', description: 'Analyze current corporate structure and identify optimization opportunities.' },
        { step: 2, title: 'Design Development', description: 'Design optimal cross-border structure considering tax, legal, and operational factors.' },
        { step: 3, title: 'Implementation', description: 'Support implementation of new structure including entity formation and compliance.' },
        { step: 4, title: 'Ongoing Management', description: 'Provide ongoing compliance support and structure optimization as needed.' }
      ],
      benefits: [
        { icon: FiShield, title: 'Tax Optimization', description: 'Minimize tax burden through strategic cross-border structuring and planning.' },
        { icon: FiTarget, title: 'Compliance Assurance', description: 'Ensure compliance with international regulations and reporting requirements.' },
        { icon: FiDollarSign, title: 'Cost Efficiency', description: 'Optimize operational costs and improve financial efficiency across jurisdictions.' },
        { icon: FiGlobe, title: 'Global Expansion', description: 'Enable seamless international expansion with proper corporate structure.' }
      ]
    },
    'private-equity-fund-administration': {
      id: 16,
      title: 'Private Equity & Fund Administration',
      category: 'For Investors & Family Offices',
      description: 'End-to-end support for PE/VC and family offices: deal screening, diligence and value-creation planning, with institutional-grade NAV, investor reporting, calls/distributions, and compliance across globally.',
      icon: FiBriefcase,
      features: [
        'Deal screening and due diligence support',
        'Value-creation planning and portfolio monitoring',
        'NAV calculation and investor reporting',
        'Capital calls and distributions processing',
        'Compliance framework and audit support',
        'LP communications and reporting cadence'
      ],
      process: [
        { step: 1, title: 'Deal Screening', description: 'Develop investment theses, shortlist targets, and frame diligence questions.' },
        { step: 2, title: 'Diligence & Planning', description: 'Perform focused diligence and build value‑creation workplans.' },
        { step: 3, title: 'Fund Administration Setup', description: 'Establish NAV policies, reporting templates, and process controls.' },
        { step: 4, title: 'Ongoing Operations', description: 'Run NAV, LP reporting, calls/distributions, and compliance calendar.' }
      ],
      benefits: [
        { icon: FiCheckCircle, title: 'Institutional‑Grade Controls', description: 'Standardized close packs, reconciliations, and policy documentation.' },
        { icon: FiBarChart, title: 'Transparent Reporting', description: 'Clear LP communications with metrics that matter.' },
        { icon: FiShield, title: 'Compliance & Audit Ready', description: 'Robust documentation and evidence trails for audits and reviews.' }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const serviceData = servicesData[slug];
      if (serviceData) {
        setService(serviceData);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <PageContainer>
        <HeroSection>
          <HeroContent>
            <h1>Loading...</h1>
          </HeroContent>
        </HeroSection>
      </PageContainer>
    );
  }

  if (!service) {
    return (
      <PageContainer>
        <HeroSection>
          <HeroContent>
            <h1>Service Not Found</h1>
            <p>The requested service could not be found.</p>
            <PrimaryButton to="/services">View All Services</PrimaryButton>
          </HeroContent>
        </HeroSection>
      </PageContainer>
    );
  }

  const IconComponent = service.icon;

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ServiceIcon>
              <IconComponent />
            </ServiceIcon>
            <CategoryBadge>{service.category}</CategoryBadge>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
          </motion.div>
        </HeroContent>
      </HeroSection>

      {/* Content Section */}
      <ContentSection>
        <ContentContainer>
          <TwoColumnGrid>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContentBlock>
                <h2>What We Offer</h2>
                <p>
                  Our {service.title.toLowerCase()} service provides comprehensive solutions 
                  tailored to your unique financial situation and goals. We combine 
                  industry expertise with personalized attention to deliver results 
                  that matter to you.
                </p>
                <p>
                  With years of experience in financial services, our team understands 
                  the complexities of modern financial planning and investment management. 
                  We stay current with market trends and regulatory changes to ensure 
                  your strategies remain effective and compliant.
                </p>
              </ContentBlock>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContentBlock>
                <h2>Key Features</h2>
                <FeaturesList>
                  {service.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <FiCheckCircle />
                      <span>{feature}</span>
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </ContentBlock>
            </motion.div>
          </TwoColumnGrid>
        </ContentContainer>
      </ContentSection>

      {/* Process Section */}
      <ProcessSection>
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: '3rem', color: '#0f766e', marginBottom: '1rem' }}>
              Our Process
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              We follow a structured approach to ensure you receive the best possible service and results.
            </p>
          </motion.div>
          
          <ProcessGrid>
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProcessStep>
                  <StepNumber>{step.step}</StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </ProcessStep>
              </motion.div>
            ))}
          </ProcessGrid>
        </ContentContainer>
      </ProcessSection>

      {/* Benefits Section */}
      <BenefitsSection>
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: '3rem', color: '#0f766e', marginBottom: '1rem' }}>
              Why Choose Our Service
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Experience the benefits of working with experienced financial professionals.
            </p>
          </motion.div>
          
          <BenefitsGrid>
            {service.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <BenefitCard>
                    <BenefitIcon />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </BenefitCard>
                </motion.div>
              );
            })}
          </BenefitsGrid>
        </ContentContainer>
      </BenefitsSection>

      {/* CTA Section */}
      <CtaSection>
        <CtaContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Get Started?</h2>
            <p>
              Take the first step towards achieving your financial goals. 
              Contact us today for a free consultation and discover how our 
              {service.title.toLowerCase()} service can help you succeed.
            </p>
            <CtaButtons>
              <PrimaryButton to="/contact">
                Get Free Consultation <FiArrowRight />
              </PrimaryButton>
              <SecondaryButton to="/services">
                View All Services <FiArrowRight />
              </SecondaryButton>
            </CtaButtons>
            <ContactInfo>
              <ContactItem>
                <FiPhone />
                <span>+971-528477349</span>
              </ContactItem>
              <ContactItem>
                <FiMail />
                <span>Yashaswi.das@ydadvisory.ae</span>
              </ContactItem>
              <ContactItem>
                <FiCalendar />
                <span>Schedule a Meeting</span>
              </ContactItem>
            </ContactInfo>
          </motion.div>
        </CtaContent>
      </CtaSection>
    </PageContainer>
  );
};

export default ServiceDetail;