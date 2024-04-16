import { useState } from 'react';

import TableViewIcon from '@mui/icons-material/TableView';

import { ButtonText } from 'containers/application-bar/constants';
import { LoadingButtonStyled } from 'containers/application-bar/styled';
import RenderOnRole from 'common/components/render-on-role/RenderOnRole';

import { DownloadEXCELModal } from './DonwloadExcelModal';

export function TimeTrackerButtonSet(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (): void => setIsOpen(!isOpen);

  return (
    <>
      <RenderOnRole roles={['admin', 'god']}>
        <LoadingButtonStyled
          startIcon={<TableViewIcon fontSize="medium" />}
          variant="outlined"
          color="secondary"
          onClick={toggleModal}
          loadingPosition="start"
          sx={{ color: (theme) => theme.palette.primary.main }}
        >
          {ButtonText.DownloadEXCEL}
        </LoadingButtonStyled>
      </RenderOnRole>
      <DownloadEXCELModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  );
}
