import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiTag, FiClock, FiShare2, FiBookmark, FiHeart, FiMessageCircle, FiLinkedin, FiTwitter, FiFacebook, FiMail, FiPrinter, FiChevronUp } from 'react-icons/fi';
import SEO from '../components/SEO';
import { articleSchema } from '../utils/structuredData';

const BlogDetailContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.primary[600]};
  text-decoration: none;
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing[8]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.primary[200]};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.white};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.sm};
  
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
    background: ${props => props.theme.colors.primary[50]};
    border-color: ${props => props.theme.colors.primary[300]};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  svg {
    font-size: ${props => props.theme.fontSizes.base};
  }
`;

const ArticleContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
`;

const ArticleHeader = styled.div`
  position: relative;
  height: 400px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.8), rgba(15, 118, 110, 0.9));
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  padding: ${props => props.theme.spacing[8]};
  color: ${props => props.theme.colors.white};
  width: 100%;
`;

const CategoryTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  margin-bottom: ${props => props.theme.spacing[4]};
  backdrop-filter: blur(10px);
`;

const ArticleTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.white};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[6]};
  flex-wrap: wrap;
  
  span {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.gray[200]};
  }
`;

const ArticleContent = styled.div`
  padding: ${props => props.theme.spacing[8]};
`;

const ArticleBody = styled.div`
  font-size: ${props => props.theme.fontSizes.lg};
  line-height: 1.8;
  color: ${props => props.theme.colors.gray[700]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin: ${props => props.theme.spacing[8]} 0 ${props => props.theme.spacing[4]} 0;
    font-weight: 700;
  }
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[700]};
    margin: ${props => props.theme.spacing[6]} 0 ${props => props.theme.spacing[3]} 0;
    font-weight: 600;
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  ul, ol {
    margin: ${props => props.theme.spacing[4]} 0;
    padding-left: ${props => props.theme.spacing[6]};
    
    li {
      margin-bottom: ${props => props.theme.spacing[2]};
    }
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary[500]};
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
    margin: ${props => props.theme.spacing[6]} 0;
    background: ${props => props.theme.colors.primary[50]};
    font-style: italic;
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const ArticleFooter = styled.div`
  padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[8]};
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  background: ${props => props.theme.colors.gray[50]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  
  .author-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary[500]};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.white};
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.lg};
  }
  
  .author-details {
    h4 {
      font-size: ${props => props.theme.fontSizes.lg};
      color: ${props => props.theme.colors.primary[800]};
      margin-bottom: ${props => props.theme.spacing[1]};
    }
    
    p {
      color: ${props => props.theme.colors.gray[600]};
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  
  button {
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.gray[300]};
    color: ${props => props.theme.colors.gray[600]};
    padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
    border-radius: ${props => props.theme.borderRadius.md};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    font-size: ${props => props.theme.fontSizes.sm};
    transition: all ${props => props.theme.transitions.fast};
    
    &:hover {
      background: ${props => props.theme.colors.primary[50]};
      border-color: ${props => props.theme.colors.primary[300]};
      color: ${props => props.theme.colors.primary[700]};
    }
  }
`;

const RelatedPosts = styled.section`
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
    font-size: ${props => props.theme.fontSizes['3xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled(Link)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  text-decoration: none;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary[300]};
  }
`;

const RelatedImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const RelatedContent = styled.div`
  padding: ${props => props.theme.spacing[4]};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[2]};
    font-weight: 600;
    line-height: 1.3;
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.5;
  }
`;

const TableOfContents = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[8]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.shadows.sm};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-weight: 600;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: ${props => props.theme.spacing[2]};
      
      a {
        color: ${props => props.theme.colors.gray[600]};
        text-decoration: none;
        font-size: ${props => props.theme.fontSizes.sm};
        transition: color ${props => props.theme.transitions.fast};
        
        &:hover {
          color: ${props => props.theme.colors.primary[600]};
        }
      }
    }
  }
`;

const EngagementSection = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  margin: ${props => props.theme.spacing[8]} 0;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const EngagementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[6]};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin: 0;
  }
`;

const EngagementStats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing[3]};
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
  
  svg {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[600]};
  }
`;

const SocialShare = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-wrap: wrap;
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  border: 1px solid ${props => props.theme.colors.gray[300]};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.gray[600]};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary[50]};
    border-color: ${props => props.theme.colors.primary[300]};
    color: ${props => props.theme.colors.primary[700]};
  }
  
  &.linkedin:hover {
    background: #0077b5;
    border-color: #0077b5;
    color: white;
  }
  
  &.twitter:hover {
    background: #1da1f2;
    border-color: #1da1f2;
    color: white;
  }
  
  &.facebook:hover {
    background: #4267b2;
    border-color: #4267b2;
    color: white;
  }
`;

const NewsletterSignup = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  text-align: center;
  color: ${props => props.theme.colors.white};
  margin: ${props => props.theme.spacing[8]} 0;
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.white};
  }
  
  p {
    color: ${props => props.theme.colors.gray[200]};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
  
  input {
    flex: 1;
    padding: ${props => props.theme.spacing[3]};
    border: none;
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.fontSizes.sm};
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    }
  }
  
  button {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary[700]};
    border: none;
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
    border-radius: ${props => props.theme.borderRadius.md};
    font-weight: 600;
    cursor: pointer;
    transition: all ${props => props.theme.transitions.fast};
    
    &:hover {
      background: ${props => props.theme.colors.gray[100]};
      transform: translateY(-1px);
    }
  }
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: ${props => props.theme.spacing[6]};
  right: ${props => props.theme.spacing[6]};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary[600]};
  color: ${props => props.theme.colors.white};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all ${props => props.theme.transitions.fast};
  z-index: 1000;
  
  &:hover {
    background: ${props => props.theme.colors.primary[700]};
    transform: translateY(-2px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    bottom: ${props => props.theme.spacing[4]};
    right: ${props => props.theme.spacing[4]};
    width: 45px;
    height: 45px;
  }
`;

const ReadingProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.progress}%;
  height: 3px;
  background: ${props => props.theme.colors.primary[600]};
  z-index: 1001;
  transition: width 0.3s ease;
`;

const BlogDetail = () => {
  const { slug } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Reading progress tracking
  React.useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (article) {
        const scrollTop = window.pageYOffset;
        const docHeight = article.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)));
        setShowBackToTop(scrollTop > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';
    const text = post?.excerpt || '';

    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert('Thank you for subscribing to our newsletter!');
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Blog posts data with June 2025 dates
  const blogPosts = {
    '5-essential-investment-strategies-for-2025': {
      id: 1,
      title: '5 Essential Investment Strategies for 2025',
      excerpt: 'Discover the most effective investment strategies that can help you build wealth and secure your financial future in the coming year.',
      image: '/images/blog/img-1.jpg',
      author: 'Yashaswi Das',
      authorInitials: 'YD',
      date: '2025-06-15',
      category: 'Investment',
      readTime: '8 min read',
      content: `
        <p>As we navigate through 2025, the investment landscape continues to evolve with new opportunities and challenges. Whether you're a seasoned investor or just starting your financial journey, having a solid investment strategy is crucial for long-term success.</p>
        
        <h2>1. Diversification Across Asset Classes</h2>
        <p>Diversification remains the cornerstone of any successful investment strategy. In 2025, we recommend spreading your investments across multiple asset classes including:</p>
        <ul>
          <li><strong>Equities:</strong> Both domestic and international stocks</li>
          <li><strong>Bonds:</strong> Government and corporate bonds for stability</li>
          <li><strong>Real Estate:</strong> REITs and direct property investments</li>
          <li><strong>Alternative Investments:</strong> Commodities, cryptocurrencies, and private equity</li>
        </ul>
        
        <h2>2. ESG-Focused Investing</h2>
        <p>Environmental, Social, and Governance (ESG) investing has gained significant momentum. Companies with strong ESG practices often demonstrate better long-term performance and risk management.</p>
        
        <blockquote>
          "Sustainable investing isn't just about doing good—it's about investing in companies that are built to last and thrive in a changing world."
        </blockquote>
        
        <h2>3. Technology and Innovation Sectors</h2>
        <p>The technology sector continues to drive innovation and growth. Focus on companies that are leading in artificial intelligence, renewable energy, and biotechnology.</p>
        
        <h2>4. Regular Portfolio Rebalancing</h2>
        <p>Market conditions change, and so should your portfolio. Regular rebalancing ensures your asset allocation stays aligned with your risk tolerance and investment goals.</p>
        
        <h2>5. Long-term Perspective</h2>
        <p>Despite market volatility, maintaining a long-term perspective is essential. Short-term market fluctuations shouldn't derail your investment strategy.</p>
        
        <p>Remember, successful investing requires patience, discipline, and a well-thought-out strategy. Consider consulting with a financial advisor to tailor these strategies to your specific situation and goals.</p>
      `
    },
    'retirement-planning-start-early-retire-comfortably': {
      id: 2,
      title: 'Retirement Planning: Start Early, Retire Comfortably',
      excerpt: 'Learn why starting your retirement planning early is crucial and how to create a comprehensive strategy for your golden years.',
      image: '/images/blog/img-2.jpg',
      author: 'Yashaswi Das',
      authorInitials: 'YD',
      date: '2025-06-12',
      category: 'Retirement',
      readTime: '10 min read',
      content: `
        <p>Retirement planning is one of the most important financial decisions you'll make in your lifetime. The earlier you start, the more comfortable your retirement years will be. Here's a comprehensive guide to help you plan for your golden years.</p>
        
        <h2>Why Start Early?</h2>
        <p>Starting your retirement planning early gives you the power of compound interest. Even small contributions made consistently over time can grow into substantial wealth.</p>
        
        <h3>The 4% Rule</h3>
        <p>The widely-accepted 4% rule suggests that you can safely withdraw 4% of your retirement savings annually without running out of money. This means if you need $50,000 per year in retirement, you should aim for a portfolio of $1.25 million.</p>
        
        <h2>Retirement Planning Steps</h2>
        <ol>
          <li><strong>Calculate Your Retirement Needs:</strong> Estimate your annual expenses in retirement</li>
          <li><strong>Determine Your Retirement Age:</strong> Consider your health, career, and personal goals</li>
          <li><strong>Maximize Employer Contributions:</strong> Take full advantage of 401(k) matching</li>
          <li><strong>Consider Tax-Advantaged Accounts:</strong> IRAs, Roth IRAs, and HSAs</li>
          <li><strong>Diversify Your Investments:</strong> Don't put all your eggs in one basket</li>
        </ol>
        
        <h2>Common Retirement Planning Mistakes</h2>
        <ul>
          <li>Not starting early enough</li>
          <li>Underestimating healthcare costs</li>
          <li>Not accounting for inflation</li>
          <li>Being too conservative with investments</li>
          <li>Not having a backup plan</li>
        </ul>
        
        <blockquote>
          "The best time to plant a tree was 20 years ago. The second best time is now. The same applies to retirement planning."
        </blockquote>
        
        <h2>Healthcare Considerations</h2>
        <p>Healthcare costs in retirement can be significant. Consider long-term care insurance and factor in potential medical expenses when calculating your retirement needs.</p>
        
        <p>Remember, it's never too late to start planning for retirement, but the earlier you begin, the more options you'll have when you're ready to retire.</p>
      `
    },
    'tax-optimization-strategies-for-high-earners': {
      id: 3,
      title: 'Tax Optimization Strategies for High Earners',
      excerpt: 'Explore advanced tax planning techniques that can help high earners minimize their tax burden and maximize their savings.',
      image: '/images/blog/img-3.jpg',
      author: 'Yashaswi Das',
      authorInitials: 'YD',
      date: '2025-06-10',
      category: 'Tax Planning',
      readTime: '12 min read',
      content: `
        <p>For high earners, effective tax planning can save thousands of dollars annually and significantly impact long-term wealth accumulation. Here are proven strategies to optimize your tax situation.</p>
        
        <h2>Maximize Retirement Contributions</h2>
        <p>Take full advantage of all available retirement accounts to reduce your taxable income:</p>
        <ul>
          <li><strong>401(k) Plans:</strong> Contribute up to $23,000 (2025 limit)</li>
          <li><strong>Roth IRA:</strong> $7,000 annual contribution limit</li>
          <li><strong>Backdoor Roth IRA:</strong> For high earners who exceed income limits</li>
          <li><strong>Mega Backdoor Roth:</strong> After-tax 401(k) contributions</li>
        </ul>
        
        <h2>Health Savings Accounts (HSAs)</h2>
        <p>HSAs offer triple tax benefits: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses. For 2025, the contribution limit is $4,300 for individuals and $8,600 for families.</p>
        
        <h2>Tax-Loss Harvesting</h2>
        <p>Systematically realize losses in your investment portfolio to offset capital gains and reduce your tax liability. This strategy works best in volatile markets.</p>
        
        <h2>Charitable Giving Strategies</h2>
        <p>Consider these tax-efficient charitable giving methods:</p>
        <ul>
          <li><strong>Donor-Advised Funds:</strong> Immediate tax deduction with flexible giving</li>
          <li><strong>Charitable Remainder Trusts:</strong> Generate income while supporting causes</li>
          <li><strong>Gifting Appreciated Securities:</strong> Avoid capital gains taxes</li>
        </ul>
        
        <blockquote>
          "The difference between tax avoidance and tax evasion is the thickness of a prison wall."
        </blockquote>
        
        <h2>Business Structure Optimization</h2>
        <p>If you own a business, consider the most tax-efficient structure:</p>
        <ul>
          <li>S-Corporations for pass-through taxation</li>
          <li>LLCs with proper tax elections</li>
          <li>Family Limited Partnerships for estate planning</li>
        </ul>
        
        <h2>Estate Planning Considerations</h2>
        <p>High earners should consider advanced estate planning strategies to minimize estate taxes and ensure smooth wealth transfer to future generations.</p>
        
        <p>Remember, tax laws are complex and constantly changing. Work with qualified tax professionals to implement these strategies effectively and legally.</p>
      `
    },
    'building-an-emergency-fund-your-financial-safety-net': {
      id: 4,
      title: 'Building an Emergency Fund: Your Financial Safety Net',
      excerpt: 'Understand the importance of emergency funds and learn practical steps to build and maintain your financial safety net.',
      image: '/images/blog/img-4.jpg',
      author: 'Yashaswi Das',
      authorInitials: 'YD',
      date: '2025-06-08',
      category: 'Financial Planning',
      readTime: '6 min read',
      content: `
        <p>An emergency fund is your financial safety net—a crucial component of any sound financial plan. It provides peace of mind and financial security when unexpected expenses arise.</p>
        
        <h2>Why You Need an Emergency Fund</h2>
        <p>Life is unpredictable. Job loss, medical emergencies, car repairs, or home maintenance can create financial stress. An emergency fund helps you handle these situations without going into debt or derailing your long-term financial goals.</p>
        
        <h2>How Much Should You Save?</h2>
        <p>Financial experts generally recommend saving 3-6 months' worth of living expenses. However, the exact amount depends on your personal situation:</p>
        <ul>
          <li><strong>3 months:</strong> If you have a stable job and dual income household</li>
          <li><strong>6 months:</strong> If you're self-employed or have irregular income</li>
          <li><strong>9-12 months:</strong> If you're in a high-risk industry or approaching retirement</li>
        </ul>
        
        <h2>Where to Keep Your Emergency Fund</h2>
        <p>Your emergency fund should be easily accessible but separate from your regular checking account:</p>
        <ul>
          <li><strong>High-yield savings accounts:</strong> Earn interest while keeping money accessible</li>
          <li><strong>Money market accounts:</strong> Higher interest rates with check-writing privileges</li>
          <li><strong>Short-term CDs:</strong> For portions you won't need immediately</li>
        </ul>
        
        <h2>Building Your Emergency Fund</h2>
        <ol>
          <li><strong>Start Small:</strong> Begin with $1,000 to cover minor emergencies</li>
          <li><strong>Set Up Automatic Transfers:</strong> Make saving automatic and consistent</li>
          <li><strong>Use Windfalls:</strong> Direct tax refunds, bonuses, and gifts to your emergency fund</li>
          <li><strong>Cut Expenses:</strong> Review your budget for areas to reduce spending</li>
          <li><strong>Increase Income:</strong> Consider side hustles or freelance work</li>
        </ol>
        
        <blockquote>
          "An emergency fund is not an investment—it's insurance for your financial well-being."
        </blockquote>
        
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Not having an emergency fund at all</li>
          <li>Using it for non-emergencies</li>
          <li>Keeping it in a low-interest account</li>
          <li>Not replenishing it after use</li>
          <li>Investing it in volatile assets</li>
        </ul>
        
        <h2>When to Use Your Emergency Fund</h2>
        <p>Only use your emergency fund for true emergencies:</p>
        <ul>
          <li>Job loss or reduced income</li>
          <li>Medical emergencies</li>
          <li>Major car or home repairs</li>
          <li>Unexpected family emergencies</li>
        </ul>
        
        <p>Remember, building an emergency fund takes time and discipline, but it's one of the most important steps you can take to secure your financial future.</p>
      `
    },
    'estate-planning-protecting-your-legacy': {
      id: 5,
      title: 'Estate Planning: Protecting Your Legacy',
      excerpt: 'Discover how proper estate planning can protect your assets and ensure your wealth is transferred according to your wishes.',
      image: '/images/blog/img-5.jpg',
      author: 'Yashaswi Das',
      authorInitials: 'YD',
      date: '2025-06-05',
      category: 'Estate Planning',
      readTime: '14 min read',
      content: `
        <p>Estate planning is about more than just writing a will—it's about protecting your family, preserving your wealth, and ensuring your wishes are carried out. Here's a comprehensive guide to estate planning.</p>
        
        <h2>Essential Estate Planning Documents</h2>
        <p>Every adult should have these fundamental documents:</p>
        <ul>
          <li><strong>Will:</strong> Specifies how your assets will be distributed</li>
          <li><strong>Living Trust:</strong> Avoids probate and provides more control</li>
          <li><strong>Power of Attorney:</strong> Designates someone to handle financial matters</li>
          <li><strong>Healthcare Directive:</strong> Outlines your medical care preferences</li>
          <li><strong>Beneficiary Designations:</strong> For retirement accounts and insurance policies</li>
        </ul>
        
        <h2>Understanding Probate</h2>
        <p>Probate is the legal process of validating a will and distributing assets. It can be time-consuming and expensive, which is why many people use trusts to avoid it.</p>
        
        <h2>Trusts: A Powerful Estate Planning Tool</h2>
        <p>Trusts offer several advantages over wills:</p>
        <ul>
          <li>Privacy (no public record)</li>
          <li>Faster asset distribution</li>
          <li>Reduced costs</li>
          <li>More control over asset distribution</li>
          <li>Protection from creditors</li>
        </ul>
        
        <h2>Tax Planning Strategies</h2>
        <p>Estate taxes can significantly reduce the wealth you pass to your heirs. Consider these strategies:</p>
        <ul>
          <li><strong>Annual Gifting:</strong> Give up to $18,000 per person per year (2025 limit)</li>
          <li><strong>Irrevocable Life Insurance Trusts:</strong> Remove life insurance from your estate</li>
          <li><strong>Charitable Remainder Trusts:</strong> Reduce estate taxes while supporting causes</li>
          <li><strong>Family Limited Partnerships:</strong> Transfer business interests with discounts</li>
        </ul>
        
        <blockquote>
          "The best estate plan is one that's simple, clear, and regularly updated to reflect your current wishes and circumstances."
        </blockquote>
        
        <h2>Digital Estate Planning</h2>
        <p>In our digital age, don't forget about your online assets:</p>
        <ul>
          <li>Social media accounts</li>
          <li>Digital photos and videos</li>
          <li>Online banking and investment accounts</li>
          <li>Cryptocurrency holdings</li>
          <li>Domain names and websites</li>
        </ul>
        
        <h2>Common Estate Planning Mistakes</h2>
        <ul>
          <li>Not having any estate plan</li>
          <li>Failing to update documents regularly</li>
          <li>Not coordinating beneficiary designations</li>
          <li>Ignoring state-specific laws</li>
          <li>Not considering family dynamics</li>
        </ul>
        
        <h2>Working with Professionals</h2>
        <p>Estate planning is complex and requires professional guidance. Consider working with:</p>
        <ul>
          <li>Estate planning attorneys</li>
          <li>Financial advisors</li>
          <li>Tax professionals</li>
          <li>Insurance specialists</li>
        </ul>
        
        <p>Remember, estate planning is not a one-time event—it's an ongoing process that should be reviewed and updated regularly as your life circumstances change.</p>
      `
    },
    'market-volatility-staying-calm-and-focused': {
      id: 6,
      title: 'Market Volatility: Staying Calm and Focused',
      excerpt: 'Learn how to navigate market volatility and maintain a long-term perspective when investing in uncertain times.',
      image: '/images/blog/img-6.jpg',
      author: 'Yashaswi Das',
      authorInitials: 'YD',
      date: '2025-06-03',
      category: 'Investment',
      readTime: '9 min read',
      content: `
        <p>Market volatility is a natural part of investing, but it can be emotionally challenging. Learning to stay calm and focused during turbulent times is crucial for long-term investment success.</p>
        
        <h2>Understanding Market Volatility</h2>
        <p>Volatility refers to the degree of variation in investment prices over time. While it can be unsettling, volatility also creates opportunities for disciplined investors.</p>
        
        <h2>Why Markets Are Volatile</h2>
        <p>Several factors contribute to market volatility:</p>
        <ul>
          <li><strong>Economic Indicators:</strong> GDP growth, inflation, unemployment</li>
          <li><strong>Geopolitical Events:</strong> Political instability, trade wars, conflicts</li>
          <li><strong>Corporate Earnings:</strong> Company performance and guidance</li>
          <li><strong>Interest Rate Changes:</strong> Federal Reserve policy decisions</li>
          <li><strong>Market Sentiment:</strong> Fear, greed, and herd behavior</li>
        </ul>
        
        <h2>Staying Calm During Volatility</h2>
        <p>Here are strategies to help you maintain perspective during market turbulence:</p>
        
        <h3>1. Focus on the Long Term</h3>
        <p>Remember that market volatility is temporary, but the long-term trend of markets has been upward. Historical data shows that markets recover from downturns.</p>
        
        <h3>2. Stick to Your Investment Plan</h3>
        <p>Your investment plan should be based on your goals, risk tolerance, and time horizon—not market conditions. Avoid making emotional decisions.</p>
        
        <h3>3. Diversify Your Portfolio</h3>
        <p>Diversification helps reduce the impact of volatility on your overall portfolio. Don't put all your eggs in one basket.</p>
        
        <h3>4. Consider Dollar-Cost Averaging</h3>
        <p>Investing a fixed amount regularly, regardless of market conditions, can help smooth out volatility and potentially lower your average cost per share.</p>
        
        <blockquote>
          "The stock market is a device for transferring money from the impatient to the patient."
        </blockquote>
        
        <h2>Opportunities in Volatility</h2>
        <p>Market volatility can present opportunities for savvy investors:</p>
        <ul>
          <li><strong>Value Investing:</strong> Quality companies may be temporarily undervalued</li>
          <li><strong>Rebalancing:</strong> Adjust your portfolio to maintain target allocations</li>
          <li><strong>Tax-Loss Harvesting:</strong> Realize losses to offset gains</li>
          <li><strong>Increased Contributions:</strong> Buy more shares at lower prices</li>
        </ul>
        
        <h2>Common Mistakes During Volatility</h2>
        <ul>
          <li>Panic selling at market lows</li>
          <li>Timing the market</li>
          <li>Checking portfolio too frequently</li>
          <li>Making emotional decisions</li>
          <li>Abandoning your investment strategy</li>
        </ul>
        
        <h2>When to Seek Professional Help</h2>
        <p>Consider working with a financial advisor if you find it difficult to stay calm during market volatility. A professional can help you:</p>
        <ul>
          <li>Develop a suitable investment strategy</li>
          <li>Provide objective perspective</li>
          <li>Help you stay disciplined</li>
          <li>Adjust your plan when appropriate</li>
        </ul>
        
        <p>Remember, successful investing requires patience, discipline, and a long-term perspective. Market volatility is temporary, but the benefits of staying invested can last a lifetime.</p>
      `
    }
  };
  
  const post = blogPosts[slug];
  
  if (!post) {
    return (
      <BlogDetailContainer>
        <SectionContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', padding: '4rem 0' }}
          >
            <h1 style={{ fontSize: '2rem', color: '#0f766e', marginBottom: '1rem' }}>
              Blog Post Not Found
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              The blog post you're looking for doesn't exist.
            </p>
            <Link to="/blog" style={{ color: '#14b8a6', textDecoration: 'none' }}>
              ← Back to Blog
            </Link>
          </motion.div>
        </SectionContent>
      </BlogDetailContainer>
    );
  }
  
  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.id !== post.id)
    .slice(0, 3);
  
  return (
    <BlogDetailContainer>
      <SEO
        title={`${post.title} | YD Advisory Blog`}
        description={post.excerpt}
        keywords={`${post.category.toLowerCase()}, financial advice, investment strategies, YD Advisory, ${post.title.toLowerCase()}`}
        url={`https://ydadvisory.ae/blog/${slug}`}
        image={`https://ydadvisory.ae${post.image}`}
        structuredData={articleSchema({
          title: post.title,
          description: post.excerpt,
          image: `https://ydadvisory.ae${post.image}`,
          datePublished: post.date,
          dateModified: post.date,
          url: `https://ydadvisory.ae/blog/${slug}`
        })}
      />
      
      <ReadingProgress progress={readingProgress} />
      
      <SectionContent>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BackButton to="/blog">
            <FiArrowLeft />
            Back to Blog
          </BackButton>
          
          <ArticleContainer>
            <ArticleHeader image={post.image}>
              <HeaderContent>
                <CategoryTag>
                  <FiTag />
                  {post.category}
                </CategoryTag>
                <ArticleTitle>{post.title}</ArticleTitle>
                <ArticleMeta>
                  <span>
                    <FiCalendar />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span>
                    <FiUser />
                    {post.author}
                  </span>
                  <span>
                    <FiClock />
                    {post.readTime}
                  </span>
                </ArticleMeta>
              </HeaderContent>
            </ArticleHeader>
            
            <ArticleContent>
              <TableOfContents>
                <h3>Table of Contents</h3>
                <ul>
                  <li><a href="#introduction">Introduction</a></li>
                  <li><a href="#key-points">Key Points</a></li>
                  <li><a href="#detailed-analysis">Detailed Analysis</a></li>
                  <li><a href="#conclusion">Conclusion</a></li>
                </ul>
              </TableOfContents>
              
              <ArticleBody dangerouslySetInnerHTML={{ __html: post.content }} />
            </ArticleContent>
            
            <ArticleFooter>
              <AuthorInfo>
                <div className="author-avatar">
                  {post.authorInitials}
                </div>
                <div className="author-details">
                  <h4>{post.author}</h4>
                  <p>CEO & Founder, YD Advisory</p>
                </div>
              </AuthorInfo>
              
              <ActionButtons>
                <button onClick={() => handleShare('email')}>
                  <FiShare2 />
                  Share
                </button>
                <button onClick={handleBookmark}>
                  <FiBookmark />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
              </ActionButtons>
            </ArticleFooter>
          </ArticleContainer>

          <EngagementSection>
            <EngagementHeader>
              <h3>Engage with this Article</h3>
              <EngagementStats>
                <StatItem>
                  <FiHeart />
                  <span>{likes} likes</span>
                </StatItem>
                <StatItem>
                  <FiMessageCircle />
                  <span>12 comments</span>
                </StatItem>
                <StatItem>
                  <FiClock />
                  <span>{post.readTime}</span>
                </StatItem>
              </EngagementStats>
            </EngagementHeader>
            
            <SocialShare>
              <ShareButton onClick={handleLike} style={{ color: isLiked ? '#ef4444' : '' }}>
                <FiHeart />
                {isLiked ? 'Liked' : 'Like'}
              </ShareButton>
              <ShareButton className="linkedin" onClick={() => handleShare('linkedin')}>
                <FiLinkedin />
                LinkedIn
              </ShareButton>
              <ShareButton className="twitter" onClick={() => handleShare('twitter')}>
                <FiTwitter />
                Twitter
              </ShareButton>
              <ShareButton className="facebook" onClick={() => handleShare('facebook')}>
                <FiFacebook />
                Facebook
              </ShareButton>
              <ShareButton onClick={() => handleShare('email')}>
                <FiMail />
                Email
              </ShareButton>
              <ShareButton onClick={() => window.print()}>
                <FiPrinter />
                Print
              </ShareButton>
            </SocialShare>
          </EngagementSection>

          <NewsletterSignup>
            <h3>Stay Updated with Financial Insights</h3>
            <p>Get the latest financial advice and market insights delivered to your inbox weekly.</p>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </NewsletterForm>
          </NewsletterSignup>
        </motion.div>
      </SectionContent>
      
      <RelatedPosts>
        <SectionContent>
          <SectionHeader>
            <h2>Related Articles</h2>
          </SectionHeader>
          
          <RelatedGrid>
            {relatedPosts.map((relatedPost) => (
              <RelatedCard key={relatedPost.id} to={`/blog/${relatedPost.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <RelatedImage image={relatedPost.image} />
                <RelatedContent>
                  <h3>{relatedPost.title}</h3>
                  <p>{relatedPost.excerpt}</p>
                </RelatedContent>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </SectionContent>
      </RelatedPosts>

      {showBackToTop && (
        <BackToTop onClick={scrollToTop}>
          <FiChevronUp />
        </BackToTop>
      )}
    </BlogDetailContainer>
  );
};

export default BlogDetail;
