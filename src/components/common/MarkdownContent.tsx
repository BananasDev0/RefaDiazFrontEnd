import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownContentProps {
  content: string;
  testId?: string;
}

const MarkdownContent = ({ content, testId }: MarkdownContentProps) => {
  return (
    <Box
      data-testid={testId}
      sx={{
        lineHeight: 1.7,
        wordBreak: 'break-word',
        '& h1, & h2, & h3, & h4': {
          lineHeight: 1.3,
          mt: 2.5,
          mb: 1.5,
        },
        '& h1': { fontSize: '2rem' },
        '& h2': { fontSize: '1.6rem' },
        '& h3': { fontSize: '1.3rem' },
        '& p': { my: 1.5 },
        '& ul, & ol': { pl: 3, my: 1.5 },
        '& li + li': { mt: 0.5 },
        '& a': { color: 'primary.main' },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'divider',
          pl: 2,
          ml: 0,
          color: 'text.secondary',
        },
        '& code': {
          px: 0.5,
          py: 0.25,
          borderRadius: 1,
          bgcolor: 'action.hover',
          fontFamily: 'monospace',
        },
        '& pre': {
          p: 2,
          borderRadius: 2,
          overflowX: 'auto',
          bgcolor: 'grey.100',
        },
        '& pre code': {
          p: 0,
          bgcolor: 'transparent',
        },
        '& img': {
          maxWidth: '100%',
        },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownContent;
