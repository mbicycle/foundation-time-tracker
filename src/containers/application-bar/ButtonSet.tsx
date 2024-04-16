import { memo } from 'react';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import { ButtonText } from './constants';
import { LoadingButtonStyled } from './styled';

const PdfButtonSet = function (): JSX.Element | null {
  return (
    <>
      <LoadingButtonStyled
        startIcon={<FileUploadOutlinedIcon fontSize="medium" />}
        variant="outlined"
        color="secondary"
        loadingPosition="start"
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {ButtonText.ExportDocx}
      </LoadingButtonStyled>
      <LoadingButtonStyled
        startIcon={<FileUploadOutlinedIcon fontSize="medium" />}
        variant="outlined"
        color="secondary"
        loadingPosition="start"
      >
        {ButtonText.ExportPDF}
      </LoadingButtonStyled>
    </>
  );
};
export default memo(PdfButtonSet);
