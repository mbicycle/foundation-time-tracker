import { memo, useState } from 'react';
import { logoutFn } from '@mbicycle/msal-bundle';
import { CONFIG } from 'shared/config/envConfig';
import msGraphInstance from 'shared/lib/msal/instance';
import msalUtils from 'shared/msalUtils';
import { Text } from 'shared/utils/constants';

import {
  Avatar, Box, Divider, IconButton, Menu, MenuItem,
} from '@mui/material';

import { useUserPhoto } from 'common/services/user-service/hooks/useUserPhoto';

import { TimeTrackerButtonSet } from './excel/TimeTrackerButtonSet';
import {
  ButtonsWrapperStyled,
  LogoIconStyled, ToolbarStyled,
} from './styled';
import { PersonIconStyled } from './utils';

const ApplicationBar = function (): JSX.Element {
  const { user } = msalUtils.useAuth();
  const { photo } = useUserPhoto();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const logoutHandle = () => {
    logoutFn(msGraphInstance.msalInstance, `${CONFIG.redirectUri}?logout=true`);
  };

  const renderAvatar = (): JSX.Element => {
    if (!photo) return <PersonIconStyled $width={40} />;

    return <Avatar alt={user?.mail} src={photo} />;
  };

  const renderUserMenu = (): JSX.Element | null => (
    <>
      <Divider
        flexItem
        orientation="vertical"
        variant="middle"
      />
      <IconButton onClick={handleClick}>
        {renderAvatar()}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={logoutHandle}>{Text.ButtonLogout}</MenuItem>
      </Menu>
    </>
  );

  return (
    <Box bgcolor="primary.main">
      <ToolbarStyled>
        <LogoIconStyled fontSize="large" />
        {user && (
          <ButtonsWrapperStyled
            container
            direction="row"
            wrap="nowrap"
            justifyContent="space-between"
          >
            <TimeTrackerButtonSet />
            {renderUserMenu()}
          </ButtonsWrapperStyled>
        )}
      </ToolbarStyled>
    </Box>
  );
};

export default memo(ApplicationBar);
