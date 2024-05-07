import { memo } from 'react';
import { Button } from '@mbicycle/foundation-ui-kit';

import { ButtonText } from './constants';

const PdfButtonSet = function (): JSX.Element | null {
  return (
    <>
      <Button>
        {ButtonText.ExportDocx}
      </Button>
      <Button>
        {ButtonText.ExportPDF}
      </Button>
    </>
  );
};
export default memo(PdfButtonSet);
