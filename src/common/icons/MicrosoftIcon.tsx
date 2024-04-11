/* eslint-disable max-len */
import { memo } from 'react';

import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

const MicrosoftIcon = function (props: SvgIconProps):JSX.Element {
  return (
    <SvgIcon {...props} viewBox="0 0 23 23">
      <path fill="#f3f3f3" d="M0 0h23v23H0z" />
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </SvgIcon>
  );
};

export default memo(MicrosoftIcon);