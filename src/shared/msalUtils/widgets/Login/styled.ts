import {
  Container, Grid, Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import LogoColoredIcon from 'common/icons/LogoColoredIcon';

export const LoginContainerStyled = styled(Grid)({
  display: 'block',
  margin: 'auto',
  alignSelf: 'center',
  verticalAlign: 'middle',
});

export const PaperStyled = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(6),
  alignItems: 'center',
}));

export const LogoColoredIconStyled = styled(LogoColoredIcon)({
  width: '5em',
  height: '5em',
});

export const ColoredLogoContainerStyled = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});