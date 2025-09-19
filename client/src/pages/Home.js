import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiShield, FiUsers, FiAward, FiTarget, FiDollarSign, FiPieChart, FiBriefcase, FiMail, FiPhone, FiMapPin, FiClock, FiBarChart, FiDownload } from 'react-icons/fi';
import { servicesService } from '../services/api';
import SEO from '../components/SEO';
import { organizationSchema, websiteSchema, localBusinessSchema } from '../utils/structuredData';

const HomeContainer = styled.div`
  padding-top: 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
`;

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100vw;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-height: 100vh;
    padding: ${props => props.theme.spacing[4]} 0;
    align-items: flex-start;
    padding-top: 120px; /* Account for fixed header */
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: brightness(0.8);
`;

const HeroSlide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(15, 118, 110, 0.5) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[12]} ${props => props.theme.spacing[4]};
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow-x: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[3]};
    min-height: calc(100vh - 120px);
    justify-content: flex-start;
    padding-top: ${props => props.theme.spacing[8]};
    max-width: 100vw;
  }
  
  h1 {
    font-family: ${props => props.theme.fonts.display};
    font-size: 2.5rem;
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    letter-spacing: -0.02em;
    text-transform: none;
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
      font-size: 2.2rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1.6rem;
      margin-bottom: ${props => props.theme.spacing[4]};
      padding: 0 ${props => props.theme.spacing[1]};
      line-height: 1.3;
      font-weight: 700;
      margin-top: ${props => props.theme.spacing[4]};
    }
  }
  
  p {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.1rem;
    color: ${props => props.theme.colors.white};
    line-height: 1.5;
    margin-bottom: ${props => props.theme.spacing[8]};
    max-width: 800px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    font-weight: 400;
    word-wrap: break-word;
    overflow-wrap: break-word;
    letter-spacing: 0.01em;
    opacity: 0.95;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 1rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 0.9rem;
      margin-bottom: ${props => props.theme.spacing[5]};
      padding: 0 ${props => props.theme.spacing[1]};
      line-height: 1.4;
      font-weight: 400;
    }
  }
`;


const CtaButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[6]};
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    padding: 0 ${props => props.theme.spacing[1]};
    width: 100%;
    max-width: 100%;
    margin-top: ${props => props.theme.spacing[4]};
  }
`;

const PrimaryButton = styled(Link)`
  font-family: ${props => props.theme.fonts.primary};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  text-align: center;
  min-width: 220px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.01em;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(20, 184, 166, 0.5);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
    scale: 1.02;
    border-color: rgba(255, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    scale: 1.01;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 100%;
    max-width: 100%;
    padding: 14px 18px;
    font-size: 0.9rem;
    width: 100%;
    border-radius: 10px;
    font-weight: 600;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SecondaryButton = styled(Link)`
  font-family: ${props => props.theme.fonts.primary};
  background: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.white};
  padding: 16px 32px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  min-width: 220px;
  backdrop-filter: blur(15px);
  letter-spacing: 0.01em;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary[700]};
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
    border-color: ${props => props.theme.colors.white};
    scale: 1.02;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 100%;
    max-width: 100%;
    padding: 14px 18px;
    font-size: 0.9rem;
    width: 100%;
    border-radius: 10px;
    font-weight: 600;
    border-width: 2px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PromoSection = styled.section`
  background: ${props => props.theme.colors.gray[50]};
  padding: ${props => props.theme.spacing[16]} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[8]} 0;
  }
`;

const PromoGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: ${props => props.theme.spacing[10]};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[6]};
  }
`;

const PromoLeft = styled.div`
  h2 {
    font-family: ${props => props.theme.fonts.display};
    font-size: 2.4rem;
    color: ${props => props.theme.colors.primary[800]};
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  p {
    font-size: 1.125rem;
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.7;
    max-width: 640px;
  }
`;

 

const PromoCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.primary[200]};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
  text-align: center;
  max-width: 400px;
  width: 100%;
  margin: 0 ${props => props.theme.spacing[4]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary[400]}, ${props => props.theme.colors.primary[600]});
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[5]} ${props => props.theme.spacing[3]};
    margin: 0 ${props => props.theme.spacing[1]};
    max-width: calc(100% - 16px);
    border-radius: ${props => props.theme.borderRadius.lg};
  }
`;

const PromoIcon = styled.div`
  width: 70px;
  height: 70px;
  background: ${props => props.theme.colors.primary[50]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[4]};
  border: 2px solid ${props => props.theme.colors.primary[200]};
  
  svg {
    width: 35px;
    height: 35px;
    color: ${props => props.theme.colors.primary[600]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    margin: 0 auto ${props => props.theme.spacing[2]};
    
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const PromoTitle = styled.h2`
  font-size: 2.2rem;
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-weight: 700;
  font-family: serif;
  line-height: 1.2;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.3rem;
    margin-bottom: ${props => props.theme.spacing[2]};
    line-height: 1.3;
  }
`;

const PromoDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: ${props => props.theme.spacing[5]};
  line-height: 1.5;
  font-weight: 400;
  max-width: 350px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.85rem;
    margin-bottom: ${props => props.theme.spacing[3]};
    max-width: 100%;
    line-height: 1.4;
  }
`;

const PromoBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${props => props.theme.spacing[6]} 0;
  text-align: left;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: 0 0 ${props => props.theme.spacing[4]} 0;
    max-width: 100%;
  }
`;

const PromoBenefit = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[3]};
  color: ${props => props.theme.colors.gray[700]};
  font-size: 1rem;
  font-weight: 500;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${props => props.theme.colors.primary[500]};
    border-radius: 50%;
    margin-right: ${props => props.theme.spacing[3]};
    flex-shrink: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.8rem;
    margin-bottom: ${props => props.theme.spacing[1]};
    
    &::before {
      width: 6px;
      height: 6px;
      margin-right: ${props => props.theme.spacing[2]};
    }
  }
`;

const PromoButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  background: ${props => props.theme.colors.primary[600]};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
  border: 2px solid ${props => props.theme.colors.primary[600]};
  width: 100%;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(20, 184, 166, 0.4);
    background: ${props => props.theme.colors.primary[700]};
    border-color: ${props => props.theme.colors.primary[700]};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
    font-size: 0.85rem;
    min-height: 44px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

// Mission Section
const MissionSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]} 0%, ${props => props.theme.colors.gray[50]} 100%);
    z-index: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[12]} 0;
  }
`;

const MissionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  position: relative;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing[3]};
  }
`;

const MissionContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const MissionIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]}, ${props => props.theme.colors.primary[600]});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes['3xl']};
  box-shadow: 0 8px 25px rgba(20, 184, 166, 0.3);
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 60px;
    height: 60px;
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin: 0 auto ${props => props.theme.spacing[4]};
  }
`;

const MissionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[6]};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-family: ${props => props.theme.fonts.display};
  line-height: 1.2;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const MissionStatement = styled.p`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[700]};
  line-height: 1.7;
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.base};
    margin-bottom: ${props => props.theme.spacing[6]};
    line-height: 1.6;
  }
`;

const MissionCarousel = styled.div`
  overflow: hidden;
  margin-top: ${props => props.theme.spacing[10]};
  margin-bottom: ${props => props.theme.spacing[10]};
`;

const MissionTrack = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[12]};
  width: max-content;
  animation: scroll-left 12s linear infinite;
  will-change: transform;
  
  &:hover {
    animation-play-state: paused;
  }

  @keyframes scroll-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
`;

const MissionValue = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[6]};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid ${props => props.theme.colors.gray[100]};
  transition: all ${props => props.theme.transitions.base};
  position: relative;
  overflow: hidden;
  min-width: 360px;
  max-width: 360px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 280px;
    max-width: 280px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary[500]}, ${props => props.theme.colors.primary[600]});
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-weight: ${props => props.theme.fontWeights.bold};
    line-height: 1.3;
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.base};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    font-style: italic;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[4]};
    
    h3 {
      font-size: ${props => props.theme.fontSizes.lg};
      margin-bottom: ${props => props.theme.spacing[3]};
    }
    
    p {
      font-size: ${props => props.theme.fontSizes.sm};
      line-height: 1.5;
    }
  }
`;

const MissionCtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.xl};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.lg};
  transition: all ${props => props.theme.transitions.base};
  box-shadow: 0 8px 25px rgba(20, 184, 166, 0.3);
  border: 2px solid ${props => props.theme.colors.primary[600]};
  position: relative;
  overflow: hidden;
  margin-top: ${props => props.theme.spacing[4]};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
    border-color: ${props => props.theme.colors.primary[700]};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
    font-size: ${props => props.theme.fontSizes.base};
    margin-top: ${props => props.theme.spacing[3]};
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing[8]};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[6]};
  
  svg {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[600]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  h3 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary[700]};
    margin-bottom: ${props => props.theme.spacing[2]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    font-weight: ${props => props.theme.fontWeights.medium};
  }
`;

const ServicesSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[12]} 0;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing[3]};
  }
`;

const SectionHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing[12]};
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 760px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing[8]};
  align-items: stretch;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 0;
  text-align: center;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary[300]};
  }
`;

const ServiceImage = styled.div.attrs(props => ({
  style: {
    backgroundImage: `url(${props.image})`
  }
}))`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: brightness(1.1) contrast(1.1);
  
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
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.white};
  }
`;

const ServiceContent = styled.div`
  padding: ${props => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  flex: 1;
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[6]};
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
  margin-top: auto;
  
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const WhyChooseUsSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
`;

const TextContent = styled.div`
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.7;
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
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
  }
  
  span {
    color: ${props => props.theme.colors.gray[700]};
    font-weight: ${props => props.theme.fontWeights.medium};
  }
`;

const ImageContent = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.xl};
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const BlogSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const BlogGrid = styled.div`
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

const BlogCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.primary[300]};
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  filter: brightness(1.05) contrast(1.1);
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    filter: brightness(1.1) contrast(1.15);
    transform: scale(1.02);
  }
`;

const BlogContent = styled.div`
  padding: ${props => props.theme.spacing[6]};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[500]};
`;

const BlogTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[3]};
  font-weight: 600;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[4]};
  flex: 1;
`;

const BlogLink = styled(Link)`
  color: ${props => props.theme.colors.primary[600]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  transition: color ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
  }
`;

// Team Showcase Section
const TeamShowcaseSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const TeamShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing[6]};
  }
`;

const TeamShowcaseContent = styled.div`
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
    font-weight: 800;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes['2xl']};
      margin-bottom: ${props => props.theme.spacing[4]};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[8]};
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes.base};
      margin-bottom: ${props => props.theme.spacing[6]};
    }
  }
`;

const TeamMemberCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all ${props => props.theme.transitions.base};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[6]};
    max-width: 100%;
  }
`;

const TeamMemberImage = styled.div.attrs(props => ({
  style: {
    backgroundImage: `url(${props.image})`
  }
}))`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin: 0 auto ${props => props.theme.spacing[4]};
  border: 4px solid ${props => props.theme.colors.primary[200]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 120px;
    height: 120px;
    margin: 0 auto ${props => props.theme.spacing[3]};
  }
`;

const TeamMemberImageSquare = styled.div.attrs(props => ({
  style: {
    backgroundImage: `url(${props.image})`
  }
}))`
  width: 300px;
  height: 300px;
  border-radius: ${props => props.theme.borderRadius.xl};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  border: none;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 200px;
    height: 200px;
  }
`;

const TeamMemberName = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[2]};
  font-weight: 600;
`;

const TeamMemberPosition = styled.p`
  color: ${props => props.theme.colors.primary[600]};
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const TeamMemberBio = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  font-size: ${props => props.theme.fontSizes.sm};
`;

// Calculator Showcase Section
const CalculatorShowcaseSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.gray[50]} 0%, ${props => props.theme.colors.gray[100]} 100%);
`;

const CalculatorStepsTitle = styled.h2`
  text-align: center;
  color: ${props => props.theme.colors.primary[800]};
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  font-family: ${props => props.theme.fonts.display};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const CalculatorStepsGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 1.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const CalculatorStepCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  padding: 2.2rem 2rem;
  min-width: 260px;
  max-width: 320px;
  flex: 1 1 260px;
  text-align: center;
  display: flex;
  flex-direction: column;
  transition: all ${props => props.theme.transitions.base};
  border: 1px solid ${props => props.theme.colors.gray[100]};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 280px;
    max-width: 100%;
    padding: 2rem 1.5rem;
  }
`;

const CalculatorStepNumber = styled.div`
  color: ${props => props.theme.colors.primary[700]};
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  font-family: ${props => props.theme.fonts.display};
`;

const CalculatorStepTitle = styled.div`
  font-size: 1.18rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.3rem;
  line-height: 1.3;
`;

const CalculatorStepSubtitle = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 400;
  line-height: 1.4;
  font-style: italic;
`;

const CalculatorStepsButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const CalculatorShowcaseContent = styled.div`
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
    font-weight: 800;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[8]};
  }
`;

const CalculatorPreview = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
`;

const CalculatorIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]}, ${props => props.theme.colors.primary[600]});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes['3xl']};
`;

const CalculatorTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[3]};
  text-align: center;
  font-weight: 600;
`;

const CalculatorDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  text-align: center;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[6]};
`;

// Contact Preview Section
const ContactPreviewSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  color: ${props => props.theme.colors.white};
`;

const ContactPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
`;

const ContactPreviewContent = styled.div`
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.white};
    margin-bottom: ${props => props.theme.spacing[6]};
    font-weight: 800;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[8]};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  
  svg {
    color: ${props => props.theme.colors.primary[600]};
    font-size: ${props => props.theme.fontSizes.xl};
  }
  
  span {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const CtaSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
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

// Brochure Download Section
const BrochureSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.gray[50]} 0%, ${props => props.theme.colors.gray[100]} 100%);
`;

const BrochureContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const BrochureCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[12]};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  }
`;

const BrochureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]}, ${props => props.theme.colors.primary[600]});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes['3xl']};
`;

const BrochureTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-weight: 700;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
  }
`;

const BrochureDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const BrochureButton = styled.a`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: 18px 36px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 15px 35px rgba(20, 184, 166, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  text-align: center;
  min-width: 220px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px rgba(20, 184, 166, 0.6);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
    scale: 1.05;
    border-color: rgba(255, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px);
    scale: 1.02;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 250px;
    padding: 16px 32px;
    font-size: 1rem;
  }
`;

const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroSlides = [
    {
      id: 1,
      title: 'We turn data into decisions. You turn deals into results.',
      description: 'From 409A to SPA—valuation, M&A execution, and Fractional CFO support that converts analysis into action.',
      bgImage: '/images/slider/slide-1.jpg'
    }
  ];

  useEffect(() => {
    // Set static services immediately to avoid API errors
    setFeaturedServices([
      {
        id: 1,
        title: 'Business & Complex Valuations (incl. 409A)',
        description: 'Independent, defensible valuations for fundraises, ESOPs, compliance, and strategic decisions—using DCF, comparables, and precedent transactions. Deliverables include a clear methodology write-up, sensitivity tables, and a board-ready summary.',
        icon: 'FiDollarSign',
        image: '/images/services/img-1.jpg',
        slug: 'business-valuations-409a'
      },
      {
        id: 2,
        title: 'Financial Modelling & Forecasting',
        description: 'Investor-grade three-statement models, unit economics, and multi-scenario analysis that quantify drivers and risk. Built for capital raises, budgeting, and M&A.',
        icon: 'FiBarChart',
        image: '/images/services/img-2.jpg',
        slug: 'financial-modelling-forecasting'
      },
      {
        id: 3,
        title: 'M&A Advisory (Buy- & Sell-Side)',
        description: 'Hands-on support across the deal lifecycle—target screening, red-flag diligence, SPA/PPA modelling, working-capital analysis, and integration planning. We help you articulate value drivers and negotiate with confidence.',
        icon: 'FiBriefcase',
        image: '/images/services/img-3.jpg',
        slug: 'ma-advisory'
      },
      {
        id: 4,
        title: 'Transaction Advisory & Due Diligence',
        description: 'Focused QoE reviews, data-room preparation, and issue lists that keep timelines tight and surprises low—so you can move from indicative offers to close faster.',
        icon: 'FiTarget',
        image: '/images/services/img-4.jpg',
        slug: 'transaction-advisory'
      },
      {
        id: 5,
        title: 'Fractional CFO & Board Support',
        description: 'Senior finance leadership—KPI packs, board reporting, capital strategy, fair-value roll-forwards, and investor updates—without the full-time overhead.',
        icon: 'FiUsers',
        image: '/images/services/img-5.jpg',
        slug: 'fractional-cfo'
      },
      {
        id: 6,
        title: 'Fundraising Support (Equity & Debt)',
        description: 'Pitch-deck refinement, cap-table design, term-sheet advisory, and lender packages—everything required to run a professional, founder-friendly process.',
        icon: 'FiTrendingUp',
        image: '/images/services/img-6.jpg',
        slug: 'fundraising-support'
      }
    ]);
    setLoading(false);
  }, []);


  const iconMap = {
    FiTrendingUp,
    FiTarget,
    FiShield,
    FiDollarSign,
    FiPieChart,
    FiBriefcase,
    FiBarChart
  };

  return (
    <HomeContainer>
      <SEO
        title="YD Advisory - Financial Consulting Excellence in Dubai, UAE"
        description="YD Advisory is your trusted financial partner in Dubai, UAE. We provide comprehensive financial solutions including investment management, financial planning, risk assessment, and business consulting. Serving clients across UAE, India, Singapore, and more."
        keywords="financial advisory Dubai, investment management UAE, financial planning Dubai, business consulting UAE, wealth management Dubai, YD Advisory, financial services Dubai, investment advisor UAE"
        url="https://ydadvisory.ae"
        structuredData={[organizationSchema, websiteSchema, localBusinessSchema]}
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroSlide>
          <VideoBackground autoPlay muted loop playsInline crossOrigin="anonymous">
            <source src="https://api.tworldgcc.com/uploads/Dubai_Edited_52a98e58ec.mp4" type="video/mp4" />
          </VideoBackground>
          <HeroContent>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {heroSlides[0].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {heroSlides[0].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <CtaButtons>
                <PrimaryButton to="/contact">
                  Get Free Consultation <FiArrowRight />
                </PrimaryButton>
                <SecondaryButton to="/calculator">
                  YD Valuator <FiArrowRight />
                </SecondaryButton>
              </CtaButtons>
            </motion.div>
          </HeroContent>
        </HeroSlide>
      </HeroSection>

      {/* Promotional Section */}
      <PromoSection>
        <PromoGrid>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <PromoLeft>
              <h2>Business Valuation Calculator: What's Your Business Really Worth?</h2>
              <p>
                Get an instant, professional estimate of your business value using our free YD Valuator — accurate and on-brand for boardrooms and investors.
              </p>
            </PromoLeft>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <PromoCard>
            <PromoIcon>
              <FiBarChart />
            </PromoIcon>
            <PromoTitle>Business Valuation Calculator</PromoTitle>
            <PromoDescription>
              Get an instant, professional estimate of your business value using our free calculator — accurate, no strings attached.
            </PromoDescription>
            <PromoBenefits>
              <PromoBenefit>Industry‑grade methodology</PromoBenefit>
              <PromoBenefit>Fast, audit‑ready output</PromoBenefit>
              <PromoBenefit>100% free to try</PromoBenefit>
            </PromoBenefits>
            <PromoButton to="/calculator" aria-label="Access Free Calculator">
              <FiBarChart />
              Access Free Calculator
              <FiArrowRight />
            </PromoButton>
          </PromoCard>
          </motion.div>
        </PromoGrid>
      </PromoSection>

      {/* Services Section */}
      <ServicesSection>
        <SectionContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              YD Advisory Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Valuation, M&A, and Fractional CFO support that turns analysis into action—IVSC‑aligned and boardroom‑ready.
            </motion.p>
          </SectionHeader>

          <ServicesGrid>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ServiceCard>
                    <div style={{ height: '200px', background: '#f3f4f6', borderRadius: '8px' }} />
                  </ServiceCard>
                </motion.div>
              ))
            ) : (
              (() => {
                const base = featuredServices.slice(0, 3);
                const cfo = featuredServices.find(s => s.slug === 'fractional-cfo');
                const list = cfo ? [...base, cfo] : featuredServices.slice(0, 4);
                return list.map((service, index) => {
                const IconComponent = iconMap[service.icon] || FiTrendingUp;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ServiceCard>
                      <ServiceImage image={service.image}>
                        <IconComponent />
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
                );
              });
            })()
            )}
          </ServicesGrid>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <PrimaryButton to="/services">
              View More Services <FiArrowRight />
            </PrimaryButton>
          </motion.div>
        </SectionContent>
      </ServicesSection>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection>
        <SectionContent>
          <TwoColumnGrid>
            <TextContent>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Why YD Advisory?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Because deals move when numbers are credible and the story is clear. 
                We deliver IVSC-aligned valuations, decision-ready models, and transaction 
                execution that convert strategy into results.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <FeaturesList>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Raise smarter (409A, cap tables, investor decks)</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Buy and sell with conviction (diligence, SPA/PPA, integration)</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Operate with clarity (CFO stewardship, KPI packs, fair-value updates)</span>
                  </FeatureItem>
                </FeaturesList>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                style={{ marginTop: '2rem' }}
              >
                <PrimaryButton to="/about">
                  Read More About Us <FiArrowRight />
                </PrimaryButton>
              </motion.div>
            </TextContent>
            <ImageContent>
              <motion.img
                src="/images/about-pic.jpg"
                alt="YD Advisory Team"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </ImageContent>
          </TwoColumnGrid>
        </SectionContent>
      </WhyChooseUsSection>

      {/* Whom We Serve Section */}
      <MissionSection>
        <MissionContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <MissionContent>
              <MissionIcon>
                <FiUsers />
              </MissionIcon>
              <MissionTitle>Whom We Serve</MissionTitle>
              <MissionStatement>
                We provide specialized financial expertise across the entire ecosystem, from startups to established enterprises.
              </MissionStatement>
              <MissionCarousel>
                <MissionTrack>
                <MissionValue>
                  <h3>For Founders & Entrepreneurs</h3>
                  <p>From "what's my company worth?" to "how do we close this round?"—we turn numbers into a valuation you can defend and a story investors buy.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For CFOs & Finance Leaders</h3>
                  <p>Board-ready models, KPI packs, and fair-value updates—plus a fractional lift when you need senior capacity without the full-time cost for all financial needs for a company.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For Investors & Family Offices</h3>
                  <p>Buy, sell, or hold with conviction—IVSC-aligned valuations, red-flag diligence, SPA/PPA modelling, and post-deal integration support.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For SMEs & Boards</h3>
                  <p>Clear options, not noise—feasibility papers, scenario analysis, working-capital reviews, and decision memos that move the agenda.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For Private Equity and VC Funds</h3>
                  <p>Fast, defensible workstreams—screening, unit economics, QoE-style reviews, and complex security pricing that stands up in IC.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For Lenders & Credit Teams</h3>
                  <p>Reliable covenant math and borrower models—stress tests, cash-flow forecasts, and collateral valuations that reduce surprises.</p>
                </MissionValue>
                {/* duplicate for seamless infinite scroll */}
                <MissionValue>
                  <h3>For Founders & Entrepreneurs</h3>
                  <p>From "what's my company worth?" to "how do we close this round?"—we turn numbers into a valuation you can defend and a story investors buy.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For CFOs & Finance Leaders</h3>
                  <p>Board-ready models, KPI packs, and fair-value updates—plus a fractional lift when you need senior capacity without the full-time cost for all financial needs for a company.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For Investors & Family Offices</h3>
                  <p>Buy, sell, or hold with conviction—IVSC-aligned valuations, red-flag diligence, SPA/PPA modelling, and post-deal integration support.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For SMEs & Boards</h3>
                  <p>Clear options, not noise—feasibility papers, scenario analysis, working-capital reviews, and decision memos that move the agenda.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For Private Equity and VC Funds</h3>
                  <p>Fast, defensible workstreams—screening, unit economics, QoE-style reviews, and complex security pricing that stands up in IC.</p>
                </MissionValue>
                <MissionValue>
                  <h3>For Lenders & Credit Teams</h3>
                  <p>Reliable covenant math and borrower models—stress tests, cash-flow forecasts, and collateral valuations that reduce surprises.</p>
                </MissionValue>
                </MissionTrack>
              </MissionCarousel>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginTop: '2rem' }}
              >
                <MissionCtaButton to="/calculator">
                  Try YD Valuator <FiArrowRight />
                </MissionCtaButton>
              </motion.div>
            </MissionContent>
          </motion.div>
        </MissionContainer>
      </MissionSection>

      {/* Blog Section */}
      <BlogSection>
        <SectionContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Latest Financial Insights
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Stay informed with our expert advice and market insights
            </motion.p>
          </SectionHeader>

          <BlogGrid>
            {[
              {
                id: 1,
                title: '5 Essential Investment Strategies for 2025',
                excerpt: 'Discover the most effective investment strategies that can help you build wealth and secure your financial future.',
                image: '/images/blog/img-1.jpg',
                date: '2025-06-15',
                readTime: '8 min read'
              },
              {
                id: 2,
                title: 'Retirement Planning: Start Early, Retire Comfortably',
                excerpt: 'Learn why starting your retirement planning early is crucial and how to create a comprehensive strategy.',
                image: '/images/blog/img-2.jpg',
                date: '2025-06-12',
                readTime: '10 min read'
              },
              {
                id: 3,
                title: 'Building an Emergency Fund: Your Financial Safety Net',
                excerpt: 'Understand the importance of emergency funds and learn practical steps to build your financial safety net.',
                image: '/images/blog/img-3.jpg',
                date: '2025-06-08',
                readTime: '6 min read'
              }
            ].map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BlogCard>
                  <BlogImage image={post.image} />
                  <BlogContent>
                    <BlogMeta>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>{post.readTime}</span>
                    </BlogMeta>
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                    <BlogLink to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                      Read More <FiArrowRight />
                    </BlogLink>
                  </BlogContent>
                </BlogCard>
              </motion.div>
            ))}
          </BlogGrid>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <PrimaryButton to="/blog">
              View All Blogs <FiArrowRight />
            </PrimaryButton>
          </motion.div>
        </SectionContent>
      </BlogSection>

      {/* Team Showcase Section */}
      <TeamShowcaseSection>
        <SectionContent>
          <TeamShowcaseGrid>
            <TeamShowcaseContent>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Meet Our Founder
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p style={{ marginBottom: '0.75rem' }}>Yashaswi Das — Founder & Principal</p>
                <ul style={{ paddingLeft: '1rem', margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
                  <li>Defensible valuations: 409A, complex securities, IP/PPA</li>
                  <li>Decision‑ready models: three‑statement, scenarios, Monte‑Carlo</li>
                  <li>Hands‑on M&A: red‑flag diligence, SPA/PPA, integration</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                viewport={{ once: true }}
                style={{ marginTop: '1rem' }}
              >
                <PrimaryButton to="/about">
                  Read More <FiArrowRight />
                </PrimaryButton>
              </motion.div>
            </TeamShowcaseContent>
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
             >
               <TeamMemberImageSquare image="/images/team/yashaswi_das.png" />
             </motion.div>
          </TeamShowcaseGrid>
        </SectionContent>
      </TeamShowcaseSection>

      {/* Calculator Showcase Section */}
        <CalculatorShowcaseSection>
          <SectionContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <CalculatorStepsTitle>Evaluate your startup</CalculatorStepsTitle>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CalculatorStepsGrid>
                <CalculatorStepCard>
                  <CalculatorStepNumber>1</CalculatorStepNumber>
                  <CalculatorStepTitle>Answer targeted questions</CalculatorStepTitle>
                  <CalculatorStepSubtitle>Customized to your startup's stage<br/>(pre-seed, seed)</CalculatorStepSubtitle>
                </CalculatorStepCard>
                <CalculatorStepCard>
                  <CalculatorStepNumber>2</CalculatorStepNumber>
                  <CalculatorStepTitle>Get automatic valuation</CalculatorStepTitle>
                  <CalculatorStepSubtitle>Based on real market data</CalculatorStepSubtitle>
                </CalculatorStepCard>
                <CalculatorStepCard>
                  <CalculatorStepNumber>3</CalculatorStepNumber>
                  <CalculatorStepTitle>Gain actionable insights</CalculatorStepTitle>
                  <CalculatorStepSubtitle>To improve your business value</CalculatorStepSubtitle>
                </CalculatorStepCard>
              </CalculatorStepsGrid>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <CalculatorStepsButtonWrapper>
                <PrimaryButton to="/calculator" style={{ fontSize: '1.1rem', padding: '18px 40px', borderRadius: 14, fontWeight: 700 }}>
                  Try YD Valuator <FiArrowRight />
                </PrimaryButton>
              </CalculatorStepsButtonWrapper>
            </motion.div>
          </SectionContent>
        </CalculatorShowcaseSection>

      {/* Contact Preview Section */}
      <ContactPreviewSection>
        <SectionContent>
          <ContactPreviewGrid>
            <ContactPreviewContent>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Get In Touch With Us
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to start your financial journey? Contact us today for a free consultation 
                and discover how we can help you achieve your financial goals.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <PrimaryButton to="/contact">
                  Contact Us Today <FiArrowRight />
                </PrimaryButton>
              </motion.div>
            </ContactPreviewContent>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
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
                  <FiMapPin />
                  <span>Level 41, Emirates Tower – DIFC, Near Trade Center – Dubai, UAE</span>
                </ContactItem>
              </ContactInfo>
            </motion.div>
          </ContactPreviewGrid>
        </SectionContent>
      </ContactPreviewSection>

      {/* Brochure Download Section */}
      <BrochureSection>
        <BrochureContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <BrochureCard>
              <BrochureIcon>
                <FiDownload />
              </BrochureIcon>
              <BrochureTitle>Download Our Company Brochure</BrochureTitle>
              <BrochureDescription>
                Get comprehensive insights into our financial services, expertise, and success stories. 
                Download our detailed brochure to learn more about how YD Advisory can help you achieve your financial goals.
              </BrochureDescription>
              <BrochureButton 
                href="/brochure/yd-advisory-brochure.pdf" 
                download="YD-Advisory-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiDownload />
                Download Brochure
              </BrochureButton>
            </BrochureCard>
          </motion.div>
        </BrochureContainer>
      </BrochureSection>

      {/* CTA Section */}
      <CtaSection>
        <CtaContent>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Take Control of Your Financial Future?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Schedule a free consultation with our expert advisors and discover how 
            our personalized approach can help you achieve your financial goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <PrimaryButton to="/contact">
              Schedule Free Consultation <FiArrowRight />
            </PrimaryButton>
          </motion.div>
        </CtaContent>
      </CtaSection>
    </HomeContainer>
  );
};

export default Home;