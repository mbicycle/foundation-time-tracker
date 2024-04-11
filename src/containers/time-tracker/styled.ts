import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const MainWrapperStyled = styled(Box)({
  margin: '0 auto',
  padding: '24px 40px',
  maxWidth: '1055px',
  width: '100%',
});

export const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.border}`,
  borderRadius: '4px',
  marginBottom: '24px',
}));

export const TitleBoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.border}`,
  padding: '16px 24px',
}));

export const ContentBoxWrapper = styled(Box)({
  width: '100%',
  padding: '24px',
});

export const RowWrapper = styled(Box)({
  maxWidth: '600px',
  width: '100%',
});

export const NumberInputWrapper = styled(Box)({
  maxWidth: '115px',
  width: '100%',
});
