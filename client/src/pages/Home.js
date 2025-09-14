import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiTrendingUp, FiShield, FiUsers, FiAward, FiTarget, FiDollarSign, FiPieChart, FiBriefcase, FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiMail, FiPhone, FiMapPin, FiClock, FiBarChart, FiDownload } from 'react-icons/fi';
import { servicesService } from '../services/api';
import SEO from '../components/SEO';
import { organizationSchema, websiteSchema, localBusinessSchema } from '../utils/structuredData';

const HomeContainer = styled.div`
  padding-top: 0;
`;

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroSlide = styled(motion.div).attrs(props => ({
  style: {
    backgroundImage: `linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(15, 118, 110, 0.4) 100%), url(${props.bgImage})`
  }
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  width: 100%;
  box-sizing: border-box;
  
  h1 {
    font-size: 4rem;
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    font-weight: 800;
    line-height: 1.1;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 3rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 2rem;
      margin-bottom: ${props => props.theme.spacing[4]};
    }
  }
  
  p {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.white};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[8]};
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    font-weight: 500;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 1.25rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1rem;
      margin-bottom: ${props => props.theme.spacing[6]};
      padding: 0 ${props => props.theme.spacing[2]};
    }
  }
`;

const HeroControls = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing[8]};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  z-index: 3;
`;

const HeroDots = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
`;

const HeroDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.white};
  background: ${props => props.active ? props.theme.colors.white : 'transparent'};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.white};
    opacity: 0.7;
  }
`;

const HeroNavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.white};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary[600]};
    transform: scale(1.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
  }
`;

const PlayPauseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.white};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary[600]};
    transform: scale(1.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
  }
`;

const CtaButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    padding: 0 ${props => props.theme.spacing[4]};
  }
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: 18px 36px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
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
    min-width: 280px;
    max-width: 100%;
    padding: 16px 32px;
    font-size: 1rem;
    width: 100%;
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
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary[700]};
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 255, 255, 0.3);
    border-color: ${props => props.theme.colors.white};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 280px;
    max-width: 100%;
    padding: 14px 28px;
    font-size: 1rem;
    width: 100%;
  }
`;

const StatsSection = styled.section`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
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
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ServicesGrid = styled.div`
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

const ServiceCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 0;
  text-align: center;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
  
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
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[6]};
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

const CalculatorShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      title: 'Your Financial Future Starts Here',
      description: 'At YD Advisory, we provide comprehensive financial solutions tailored to your unique needs. Our expert advisors help you navigate complex financial landscapes and achieve your long-term goals with confidence.',
      bgImage: '/images/slider/slide-1.jpg'
    },
    {
      id: 2,
      title: 'Expert Financial Guidance',
      description: 'With over 9+ years of experience, our founder Yashaswi Das leads our team in delivering personalized financial strategies that help you build wealth and secure your future.',
      bgImage: '/images/slider/slide-2.jpg'
    },
    {
      id: 3,
      title: 'Advanced Financial Tools',
      description: 'Access our comprehensive suite of financial calculators and planning tools to make informed decisions about your investments, retirement, and financial goals.',
      bgImage: '/images/slider/slide-3.jpg'
    },
    {
      id: 4,
      title: 'Personalized Service',
      description: 'We believe in building lasting relationships with our clients. Our dedicated approach ensures you receive the attention and expertise you deserve for your financial success.',
      bgImage: '/images/slider/slide-4.jpg'
    }
  ];

  useEffect(() => {
    // Set static services immediately to avoid API errors
    setFeaturedServices([
      {
        id: 1,
        title: 'Business Valuations & 409A Valuation',
        description: 'Independent, audit-ready valuations built for fundraises, ESOPs, and compliance.',
        icon: 'FiDollarSign',
        image: '/images/services/img-1.jpg',
        slug: 'business-valuations-409a'
      },
      {
        id: 2,
        title: 'Advanced Financial Modelling & Forecasting',
        description: 'Investor-grade three-statement models, sensitivity scenarios, and unit economics.',
        icon: 'FiBarChart',
        image: '/images/services/img-2.jpg',
        slug: 'financial-modelling-forecasting'
      },
      {
        id: 3,
        title: 'M&A Advisory',
        description: 'Comprehensive M&A support including red-flag diligence and transaction structuring for successful deal execution.',
        icon: 'FiBriefcase',
        image: '/images/services/img-3.jpg',
        slug: 'ma-advisory'
      }
    ]);
    setLoading(false);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
      
      {/* Hero Section with Slider */}
      <HeroSection>
        <AnimatePresence mode="wait">
          <HeroSlide
            key={currentSlide}
            bgImage={heroSlides[currentSlide].bgImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroContent>
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              <motion.p
                key={`description-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>
              <motion.div
                key={`buttons-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <CtaButtons>
                  <PrimaryButton to="/contact">
                    Get Free Consultation <FiArrowRight />
                  </PrimaryButton>
                  <SecondaryButton to="/calculator">
                    Financial Calculator <FiArrowRight />
                  </SecondaryButton>
                </CtaButtons>
              </motion.div>
            </HeroContent>
          </HeroSlide>
        </AnimatePresence>

        <HeroControls>
          <HeroNavButton onClick={prevSlide}>
            <FiChevronLeft />
          </HeroNavButton>
          
          <HeroDots>
            {heroSlides.map((_, index) => (
              <HeroDot
                key={index}
                active={index === currentSlide}
                onClick={() => goToSlide(index)}
              />
            ))}
          </HeroDots>
          
          <PlayPauseButton onClick={togglePlayPause}>
            {isPlaying ? <FiPause /> : <FiPlay />}
          </PlayPauseButton>
          
          <HeroNavButton onClick={nextSlide}>
            <FiChevronRight />
          </HeroNavButton>
        </HeroControls>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <StatsGrid>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <StatCard>
              <FiUsers />
              <h3>50+</h3>
              <p>Clients</p>
            </StatCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <StatCard>
              <FiTrendingUp />
              <h3>$100M+</h3>
              <p>Capital Supported</p>
            </StatCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <StatCard>
              <FiAward />
              <h3>9+</h3>
              <p>Geographies</p>
            </StatCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <StatCard>
              <FiCheckCircle />
              <h3>9+</h3>
              <p>Sectors Covered</p>
            </StatCard>
          </motion.div>
        </StatsGrid>
      </StatsSection>

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
              Our Financial Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Comprehensive financial solutions designed to help you achieve your goals 
              and secure your future with expert guidance.
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
              featuredServices.slice(0, 3).map((service, index) => {
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
              })
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
                Why Choose YD Advisory?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                We combine decades of financial expertise with cutting-edge technology 
                to deliver personalized solutions that help you achieve your financial 
                goals with confidence and clarity.
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
                    <span>Personalized financial strategies tailored to your unique situation</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Transparent fee structure with no hidden costs</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Regular portfolio reviews and performance monitoring</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Access to advanced financial tools and resources</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Dedicated relationship manager for ongoing support</span>
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
                Meet Our Financial Expert
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Yashaswi Das, a Chartered Accountant (ICAI) and CFA Charter holder, brings 8+ years of frontline deal experience from JPMorgan and Dubai Holding. 
                He delivers investment-bank-grade analytics with boutique agility, helping founders, family offices, and investors make confident financial decisions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <PrimaryButton to="/team">
                  Meet Our Expert <FiArrowRight />
                </PrimaryButton>
              </motion.div>
            </TeamShowcaseContent>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TeamMemberCard>
                <TeamMemberImage image="/images/team/Yashaswi-Das.jpg" />
                <TeamMemberName>Yashaswi Das</TeamMemberName>
                <TeamMemberPosition>CEO & Founder</TeamMemberPosition>
                <TeamMemberBio>
                  Specializing in business valuations, M&A execution, and cross-border structuring for transactions in the USD 2M–50M range. 
                  Delivers audit-ready valuations and bespoke transaction support that meet IVSC standards.
                </TeamMemberBio>
              </TeamMemberCard>
            </motion.div>
          </TeamShowcaseGrid>
        </SectionContent>
      </TeamShowcaseSection>

      {/* Calculator Showcase Section */}
      <CalculatorShowcaseSection>
        <SectionContent>
          <CalculatorShowcaseGrid>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <CalculatorPreview>
                <CalculatorIcon>
                  <FiBarChart />
                </CalculatorIcon>
                <CalculatorTitle>YD Valuator</CalculatorTitle>
                <CalculatorDescription>
                  Professional business valuation calculator powered by investment-bank-grade analytics. 
                  Get instant, audit-ready valuations for transactions in the USD 2M–50M range with IVSC compliance.
                </CalculatorDescription>
                <PrimaryButton to="/calculator">
                  Try YD Valuator <FiArrowRight />
                </PrimaryButton>
              </CalculatorPreview>
            </motion.div>
            <CalculatorShowcaseContent>
              <motion.h2
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Professional Business Valuation
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our YD Valuator delivers investment-bank-grade business valuations with boutique agility. 
                Perfect for founders, family offices, and investors seeking audit-ready valuations for M&A, fundraising, and strategic decisions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <FeaturesList>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Business Valuation Models</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>M&A Transaction Support</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>IVSC Compliant Reports</span>
                  </FeatureItem>
                  <FeatureItem>
                    <FiCheckCircle />
                    <span>Audit-Ready Documentation</span>
                  </FeatureItem>
                </FeaturesList>
              </motion.div>
            </CalculatorShowcaseContent>
          </CalculatorShowcaseGrid>
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
                  <span>+91 70576 73562</span>
                </ContactItem>
                <ContactItem>
                  <FiMail />
                  <span>info@ydadvisory.com</span>
                </ContactItem>
                <ContactItem>
                  <FiMapPin />
                  <span>123 Financial District, New York, NY 10004</span>
                </ContactItem>
                <ContactItem>
                  <FiClock />
                  <span>Mon-Fri: 9AM-6PM EST</span>
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