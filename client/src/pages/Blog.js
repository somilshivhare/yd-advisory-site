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
  background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
  color: ${props => props.theme.colors.primary[800]};
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
    color: ${props => props.theme.colors.primary[800]};
    font-weight: 800;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    color: ${props => props.theme.colors.gray[600]};
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
      title: 'Business Valuation Methods: DCF vs Market Approach in 2025',
      excerpt: 'Explore the latest trends in business valuation methodologies and understand when to use DCF versus market-based approaches for accurate valuations.',
      image: 'https://plus.unsplash.com/premium_photo-1682436315237-21f24c4c9f63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29ycG9yYXRlJTIwcGVvcGxlfGVufDB8fDB8fHww',
      author: 'Yashaswi Das',
      date: '2025-01-15',
      category: 'Business Valuation',
      readTime: '8 min read',
      slug: 'business-valuation-methods-dcf-vs-market-approach-in-2025'
    },
    {
      id: 2,
      title: 'M&A Due Diligence: Red Flags Every Buyer Should Know',
      excerpt: 'Learn about critical due diligence red flags in M&A transactions and how to identify potential risks before closing a deal.',
      image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvcnBvcmF0ZSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
      author: 'Yashaswi Das',
      date: '2025-01-12',
      category: 'M&A Advisory',
      readTime: '10 min read',
      slug: 'ma-due-diligence-red-flags-every-buyer-should-know'
    },
    {
      id: 3,
      title: '409A Valuations: Compliance Requirements for Startups',
      excerpt: 'Understand 409A valuation requirements for startups and how to ensure compliance with IRS regulations for stock option pricing.',
      image: 'https://media.istockphoto.com/id/2199340149/photo/business-professionals-engaging-in-a-productive-discussion-in-a-modern-office-setting.webp?a=1&b=1&s=612x612&w=0&k=20&c=AzpYbfTvBwINQRrvC_IPUlYv3Qa7aQKDmK0FynCyMHI=',
      author: 'Yashaswi Das',
      date: '2025-01-10',
      category: 'Compliance',
      readTime: '12 min read',
      slug: '409a-valuations-compliance-requirements-for-startups'
    },
    {
      id: 4,
      title: 'Financial Modeling Best Practices for Fundraising',
      excerpt: 'Master the art of creating investor-grade financial models that effectively communicate your business story and growth potential.',
      image: 'https://plus.unsplash.com/premium_photo-1661573729122-6619f62ef0ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGNvcnBvcmF0ZSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
      author: 'Yashaswi Das',
      date: '2025-01-08',
      category: 'Financial Modeling',
      readTime: '6 min read',
      slug: 'financial-modeling-best-practices-for-fundraising'
    },
    {
      id: 5,
      title: 'Fractional CFO Services: When to Hire vs Outsource',
      excerpt: 'Discover the benefits of fractional CFO services and learn how to determine the right time to bring in external financial leadership.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvcnBvcmF0ZSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
      author: 'Yashaswi Das',
      date: '2025-01-05',
      category: 'CFO Services',
      readTime: '14 min read',
      slug: 'fractional-cfo-services-when-to-hire-vs-outsource'
    },
    {
      id: 6,
      title: 'Valuation Trends in the Middle East: 2025 Outlook',
      excerpt: 'Analyze current valuation trends in the Middle East market and understand how regional factors impact business valuations.',
      image: 'https://plus.unsplash.com/premium_photo-1661322706206-aebb0df7ac15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGNvcnBvcmF0ZSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D',
      author: 'Yashaswi Das',
      date: '2025-01-03',
      category: 'Market Analysis',
      readTime: '9 min read',
      slug: 'valuation-trends-in-the-middle-east-2025-outlook'
    }
  ];

  return (
    <BlogContainer>
      <SEO
        title="Valuation & M&A Blog - YD Advisory Dubai"
        description="Expert insights on business valuations, M&A transactions, and financial advisory from YD Advisory Dubai. Stay informed with our latest articles on valuation methods, due diligence, and strategic financial planning."
        keywords="business valuation blog Dubai, M&A insights UAE, 409A valuations, financial modeling blog, CFO services Dubai, valuation trends Middle East"
        url="https://ydadvisory.ae/blog"
        structuredData={blogPosts.map(post => articleSchema({
          title: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          url: `https://ydadvisory.ae/blog/${post.slug}`
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
            Valuation & M&A Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Expert insights on business valuations, M&A transactions, and strategic 
            financial advisory from our experienced team in Dubai.
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
              Industry Insights & Analysis
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Strategic insights on valuations, M&A trends, and financial advisory best practices
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
                    <BlogLink to={`/blog/${post.slug}`}>
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