import { useState } from 'react';
import { Button } from '@mbicycle/foundation-ui-kit';

import { ButtonText } from 'containers/application-bar/constants';
import RenderOnRole from 'common/components/render-on-role/RenderOnRole';

import { DownloadEXCELModal } from './DonwloadExcelModal';

export function TimeTrackerButtonSet(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (): void => setIsOpen(!isOpen);

  return (
    <>
      <RenderOnRole roles={['admin', 'god']}>
        <Button
          className="max-h-[48px]"
          variant="outline"
          onClick={toggleModal}
        >
          {ButtonText.DownloadEXCEL}
        </Button>
      </RenderOnRole>
      <DownloadEXCELModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  );
}
