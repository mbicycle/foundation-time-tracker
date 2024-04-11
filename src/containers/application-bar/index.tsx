import { memo, useState } from 'react';
import msalUtils from 'shared/msalUtils';
import { msalConfig } from 'shared/utils/authConfig';
import { Text } from 'shared/utils/constants';
import { msalInstance } from 'shared/utils/interceptors';

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

  const logoutHandle = async (): Promise<void> => {
    const msalAccount = msalInstance.getAllAccounts()[0];
    const logoutRequest = {
      account: msalAccount,
      postLogoutRedirectUri: msalConfig.auth.redirectUri,
      mainWindowRedirectUri: msalConfig.auth.redirectUri,
    };

    await msalInstance.logoutPopup(logoutRequest);
    handleClose();
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
