import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 120px;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  padding: ${props => props.theme.spacing[8]};
  
  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    color: ${props => props.theme.colors.primary[700]};
    margin-bottom: ${props => props.theme.spacing[6]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
  }
`;

const BlogPost = () => {
  return (
    <PageContainer>
      <Content>
        <h1>Blog Post</h1>
        <p>
          Read our latest financial insights and expert advice on investment 
          strategies, market trends, and financial planning.
        </p>
      </Content>
    </PageContainer>
  );
};

export default BlogPost;
