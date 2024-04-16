import { styled } from '@mui/material/styles';

import PersonIcon from 'common/icons/PersonIcon';

type ExtendedImgType = {
  $width?: number;
};

export const PersonIconStyled = styled(PersonIcon, {
  shouldForwardProp: (prop) => prop !== '$width',
})<ExtendedImgType>(({ theme, $width }) => ({
  color: theme.palette.text.disabled,
  width: $width || 'auto',
  height: $width || 'auto',
  borderRadius: '50%',
  aspectRatio: '1/1',
  objectFit: 'cover',
}));
