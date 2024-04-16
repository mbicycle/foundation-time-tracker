import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ModalWrapperStyled = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '100%',
  backgroundColor: `${theme.palette.secondary.light}`,
  padding: '32px 34px',
  outline: 'none',
  borderRadius: '2px',
}));
