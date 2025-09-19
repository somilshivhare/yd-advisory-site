import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiUser, FiTag } from 'react-icons/fi';
import SEO from '../components/SEO';
import { articleSchema } from '../utils/structuredData';

const BlogContainer = styled.div`
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
  
  h1 {
    font-size: 3rem;
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    font-weight: 800;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
  }
`;

const BlogSection = styled.section`
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

const BlogImage = styled.div.attrs(props => ({
  style: {
    backgroundImage: `url(${props.image})`
  }
}))`
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
  position: relative;
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
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[500]};
  
  span {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[1]};
  }
`;

const BlogTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  font-weight: 600;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[6]};
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

const CategoryTag = styled.span`
  background: ${props => props.theme.colors.primary[100]};
  color: ${props => props.theme.colors.primary[700]};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
`;

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Essential Investment Strategies for 2025',
      excerpt: 'Discover the most effective investment strategies that can help you build wealth and secure your financial future in the coming year.',
      image: '/images/blog/img-1.jpg',
      author: 'Yashaswi Das',
      date: '2025-06-15',
      category: 'Investment',
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Retirement Planning: Start Early, Retire Comfortably',
      excerpt: 'Learn why starting your retirement planning early is crucial and how to create a comprehensive strategy for your golden years.',
      image: '/images/blog/img-2.jpg',
      author: 'Yashaswi Das',
      date: '2025-06-12',
      category: 'Retirement',
      readTime: '10 min read'
    },
    {
      id: 3,
      title: 'Tax Optimization Strategies for High Earners',
      excerpt: 'Explore advanced tax planning techniques that can help high earners minimize their tax burden and maximize their savings for their future.',
      image: '/images/blog/img-3.jpg',
      author: 'Yashaswi Das',
      date: '2025-06-10',
      category: 'Tax Planning',
      readTime: '12 min read'
    },
    {
      id: 4,
      title: 'Building an Emergency Fund: Your Financial Safety Net',
      excerpt: 'Understand the importance of emergency funds and learn practical steps to build and maintain your financial safety net.',
      image: '/images/blog/img-4.jpg',
      author: 'Yashaswi Das',
      date: '2025-06-08',
      category: 'Financial Planning',
      readTime: '6 min read'
    },
    {
      id: 5,
      title: 'Estate Planning: Protecting Your Legacy',
      excerpt: 'Discover how proper estate planning can protect your assets and ensure your wealth is transferred according to your wishes.',
      image: '/images/blog/img-5.jpg',
      author: 'Yashaswi Das',
      date: '2025-06-05',
      category: 'Estate Planning',
      readTime: '14 min read'
    },
    {
      id: 6,
      title: 'Market Volatility: Staying Calm and Focused',
      excerpt: 'Learn how to navigate market volatility and maintain a long-term perspective when investing in uncertain times.',
      image: '/images/blog/img-6.jpg',
      author: 'Yashaswi Das',
      date: '2025-06-03',
      category: 'Investment',
      readTime: '9 min read'
    }
  ];

  return (
    <BlogContainer>
      <SEO
        title="Financial Blog & Insights - YD Advisory Dubai"
        description="Expert financial insights, investment strategies, and market analysis from YD Advisory. Stay informed with our latest articles on financial planning, investment management, and wealth building strategies."
        keywords="financial blog Dubai, investment insights UAE, financial planning blog, wealth management articles, market analysis Dubai, financial education UAE"
        url="https://ydadvisory.ae/blog"
        structuredData={blogPosts.map(post => articleSchema({
          title: post.title,
          description: post.excerpt,
          image: `https://ydadvisory.ae${post.image}`,
          datePublished: post.date,
          url: `https://ydadvisory.ae/blog/${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
        }))}
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Financial Insights & News
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Stay informed with our latest insights on financial planning, 
            investment strategies, and market trends from our expert advisors.
          </motion.p>
        </HeroContent>
      </HeroSection>

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
              Latest Articles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Expert advice and insights to help you make informed financial decisions
            </motion.p>
          </SectionHeader>

          <BlogGrid>
            {blogPosts.map((post, index) => (
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
                      <span>
                        <FiCalendar />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span>
                        <FiUser />
                        {post.author}
                      </span>
                      <span>{post.readTime}</span>
                    </BlogMeta>
                    <CategoryTag>
                      <FiTag />
                      {post.category}
                    </CategoryTag>
                    <BlogTitle>{post.title}</BlogTitle>
                    <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                    <BlogLink to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Read More <FiArrowRight />
                    </BlogLink>
                  </BlogContent>
                </BlogCard>
              </motion.div>
            ))}
          </BlogGrid>
        </SectionContent>
      </BlogSection>
    </BlogContainer>
  );
};

export default Blog;