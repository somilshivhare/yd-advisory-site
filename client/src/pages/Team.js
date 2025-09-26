import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLinkedin, FiFacebook, FiMail } from 'react-icons/fi';

const TeamContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.6) 0%, rgba(15, 118, 110, 0.7) 100%), 
              url('/images/pg-title-bg.jpg') center/cover;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  width: 100%;
  box-sizing: border-box;
  
  h1 {
    font-size: 3rem;
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    font-weight: 800;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 2rem;
      margin-bottom: ${props => props.theme.spacing[4]};
    }
  }
  
  p {
    font-size: 1.25rem;
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1rem;
    }
  }
`;

const TeamSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing[3]};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes['2xl']};
      margin-bottom: ${props => props.theme.spacing[3]};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes.base};
    }
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing[8]};
  justify-items: center;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
`;

const TeamCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  text-align: center;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  max-width: 450px;
  width: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary[300]};
  }
`;

const TeamImage = styled.div.attrs(props => ({
  style: {
    backgroundImage: `url(${props.image})`
  }
}))`
  width: 300px;
  height: 300px;
  border-radius: ${props => props.theme.borderRadius.lg};
  background-size: cover;
  background-position: center;
  margin: 0 auto ${props => props.theme.spacing[6]};
  border: 4px solid ${props => props.theme.colors.primary[200]};
  transition: all ${props => props.theme.transitions.base};
  filter: brightness(1.05) contrast(1.1);
  box-shadow: ${props => props.theme.shadows.lg};
  
  ${TeamCard}:hover & {
    border-color: ${props => props.theme.colors.primary[400]};
    transform: scale(1.02);
    filter: brightness(1.1) contrast(1.15);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const TeamName = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[2]};
  font-weight: 600;
`;

const TeamPosition = styled.p`
  color: ${props => props.theme.colors.primary[600]};
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const TeamTagline = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-style: italic;
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-weight: 400;
`;

const TeamBio = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.fontSizes.sm};
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing[3]};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary[100]};
  color: ${props => props.theme.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary[600]};
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
  }
`;

const QuickContactButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  background: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[700]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: 2px solid ${props => props.theme.colors.primary[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    background: ${props => props.theme.colors.primary[100]};
    border-color: ${props => props.theme.colors.primary[400]};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ConnectButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.md};
  margin: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[2]} 0 0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
`;

const ReadMoreButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.primary[600]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border: 2px solid ${props => props.theme.colors.primary[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  margin: ${props => props.theme.spacing[2]} 0 0 ${props => props.theme.spacing[2]};
  
  &:hover {
    background: ${props => props.theme.colors.primary[50]};
    border-color: ${props => props.theme.colors.primary[400]};
    transform: translateY(-2px);
  }
`;

const MainButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing[3]};
  margin: ${props => props.theme.spacing[6]} 0 ${props => props.theme.spacing[4]} 0;
`;

const QuickContactContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[4]};
  padding-top: ${props => props.theme.spacing[4]};
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
`;

const Team = () => {
  const navigate = useNavigate();
  
  const teamMembers = [
    {
      id: 1,
      name: 'Yashaswi Das',
      position: 'CEO & Founder',
      tagline: 'Bespoke Transaction & Valuation Advisory',
      bio: 'After 8 years of frontline deal work with JPMorgan, Dubai Holding and other buy-and sell-side roles, I launched YD Advisory to give founders, family offices and investors the kind of investment-bank-grade analytics with boutique agility without extra overhead.',
      image: '/images/team/Yashaswi-Das.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/yashaswi-das/',
        facebook: 'https://facebook.com/yashaswi.das'
      }
    }
  ];

  const handleConnect = () => {
    navigate('/contact');
  };

  const handleReadMore = (memberId) => {
    navigate(`/team/${memberId}`);
  };

  return (
    <TeamContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet Our Founder
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Yashaswi Das, our founder and CEO, brings over 9+ years of experience 
            in financial planning and is dedicated to helping you achieve your 
            financial goals with personalized strategies and expert guidance.
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* Team Section */}
      <TeamSection>
        <SectionContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Financial Expert
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Meet the professional who will guide you on your financial journey
            </motion.p>
          </SectionHeader>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamCard>
                  <TeamImage image={member.image} />
                  <TeamName>{member.name}</TeamName>
                  <TeamPosition>{member.position}</TeamPosition>
                  <TeamTagline>{member.tagline}</TeamTagline>
                  
                  <MainButtonContainer>
                    <ConnectButton onClick={handleConnect}>
                      Connect
                    </ConnectButton>
                    <ReadMoreButton onClick={() => handleReadMore(member.id)}>
                      Read More
                    </ReadMoreButton>
                  </MainButtonContainer>

                  <QuickContactContainer>
                    <QuickContactButton href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <FiLinkedin />
                      LinkedIn
                    </QuickContactButton>
                    <QuickContactButton href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@ydadvisory.com?subject=Business Inquiry - YD Advisory`} target="_blank" rel="noopener noreferrer">
                      <FiMail />
                      Email
                    </QuickContactButton>
                  </QuickContactContainer>
                </TeamCard>
              </motion.div>
            ))}
          </TeamGrid>
        </SectionContent>
      </TeamSection>
    </TeamContainer>
  );
};

export default Team;