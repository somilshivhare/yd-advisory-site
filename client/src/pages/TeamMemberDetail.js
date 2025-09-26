import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiLinkedin, FiFacebook, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.white});
  padding: ${props => props.theme.spacing[8]} 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  background: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.primary[200]};
  color: ${props => props.theme.colors.primary[600]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  margin-bottom: ${props => props.theme.spacing[8]};
  
  &:hover {
    background: ${props => props.theme.colors.primary[50]};
    border-color: ${props => props.theme.colors.primary[400]};
    transform: translateY(-2px);
  }
`;

const ProfileCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const ProfileImage = styled.div`
  width: 350px;
  height: 350px;
  border-radius: ${props => props.theme.borderRadius.xl};
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  border: 4px solid ${props => props.theme.colors.primary[200]};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const ProfileName = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ProfileTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary[600]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ProfileTagline = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  font-style: italic;
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing[6]};
  font-weight: 400;
`;

const ProfileBio = styled.div`
  color: ${props => props.theme.colors.gray[700]};
  line-height: 1.8;
  font-size: ${props => props.theme.fontSizes.lg};
  text-align: left;
  white-space: pre-line;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const ConnectButton = styled.button`
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
  margin-bottom: ${props => props.theme.spacing[6]};
  
  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary[100]};
  color: ${props => props.theme.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all ${props => props.theme.transitions.fast};
  font-size: ${props => props.theme.fontSizes.xl};
  
  &:hover {
    background: ${props => props.theme.colors.primary[600]};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }
`;

const TeamMemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: 'Yashaswi Das',
      position: 'CEO & Founder',
      tagline: 'Bespoke Transaction & Valuation Advisory',
      bio: `After 8 years of frontline deal work with JPMorgan, Dubai Holding and other buy-and sell-side roles, I launched YD Advisory to give founders, family offices and investors the kind of investment-bank-grade analytics with boutique agility without extra kind of overhead. As a Chartered Accountant (ICAI) and CFA Charter holder with Valuation analyst, I deliver audit-ready valuations and bespoke transaction support that meet IVSC standards and hold up under regulator, auditor or courtroom scrutiny.

I help business owners, and their advisors answer the critical question: "What is my business really worth?" Our collaboration begins with a complimentary phone consultation to understand your objectives and unique circumstances. From there, I conduct a detailed financial analysis - leveraging market data and proprietary models - and deliver a concise, easy-to-understand report you can confidently deploy in negotiations or regulatory filings.

My practice spans the full capital-cycle:

1. Business & complex security valuations - from 409A to Black-Scholes and Monte-Carlo models.
2. Real Estate Valuations - Property, Tangibles, and real estate valuations
3. Advanced financial modelling, M&A execution and red-flag due-diligence sweeps for transactions in the USD 2m-50m range across fintech, logistics and healthcare
4. Cross-border structuring, fractional-CFO insight and post-deal stewardship that keep boards informed and covenants intact

What sets me apart is a hands-on, senior-only model: every mandate is tailored to the deal thesis, executed swiftly and confidentially, and communicated in plain English so stakeholders stay in control.

If you advise, invest in, or lead privately held businesses in the Middle East - or anywhere your growth takes you - let's talk. A complimentary discovery call is the first step toward a rigorous, defensible valuation or transaction roadmap that turns numbers into confident decisions.

Click "Connect" or message me to schedule your complimentary phone consultation to book your call and see how disciplined analytics can unlock strategic value for you and your clients.`,
      image: '/images/team/Yashaswi-Das.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/yashaswi-das/',
        facebook: 'https://facebook.com/yashaswi.das',
        email: 'yashaswi.das@ydadvisory.com'
      }
    }
  ];

  const member = teamMembers.find(m => m.id === parseInt(id));

  if (!member) {
    return <div>Team member not found</div>;
  }

  const handleConnect = () => {
    navigate('/contact');
  };

  return (
    <Container>
      <Content>
        <BackButton onClick={() => navigate('/team')}>
          <FiArrowLeft />
          Back to Team
        </BackButton>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProfileCard>
            <ProfileHeader>
              <ProfileImage image={member.image} />
              <ProfileName>{member.name}</ProfileName>
              <ProfileTitle>{member.position}</ProfileTitle>
              <ProfileTagline>{member.tagline}</ProfileTagline>
            </ProfileHeader>

            <ProfileBio>{member.bio}</ProfileBio>

            <ConnectButton onClick={handleConnect}>
              Connect
            </ConnectButton>

            <SocialLinks>
              <SocialLink href={member.social.linkedin} aria-label="LinkedIn">
                <FiLinkedin />
              </SocialLink>
              <SocialLink href={member.social.facebook} aria-label="Facebook">
                <FiFacebook />
              </SocialLink>
              <SocialLink href={`mailto:${member.social.email}`} aria-label="Email">
                <FiMail />
              </SocialLink>
            </SocialLinks>
          </ProfileCard>
        </motion.div>
      </Content>
    </Container>
  );
};

export default TeamMemberDetail;
