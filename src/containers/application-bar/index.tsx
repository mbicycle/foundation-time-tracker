import { Fragment, memo } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Button, Divider } from '@mbicycle/foundation-ui-kit';
import { logoutFn } from '@mbicycle/msal-bundle';
import { CONFIG } from 'shared/config/envConfig';
import LogoIcon from 'shared/icons/LogoIcon';
import msGraphInstance from 'shared/lib/msal/instance';
import msalUtils from 'shared/msalUtils';

import PersonIcon from 'common/icons/PersonIcon';
import { useUserPhoto } from 'common/services/user-service/hooks/useUserPhoto';

import { TimeTrackerButtonSet } from './excel/TimeTrackerButtonSet';

const ApplicationBar = function (): JSX.Element {
  const { user } = msalUtils.useAuth();
  const { photo } = useUserPhoto();

  const logoutHandle = () => {
    logoutFn(msGraphInstance.msalInstance, `${CONFIG.redirectUri}?logout=true`);
  };

  function Avatar({
    alt, src, className, onClick,
  }: { alt: string,
    src: string,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void }): JSX.Element {
    return (
      <Button className={`inline-block rounded-full ${className}`} onClick={onClick}>
        <img
          className="w-10 h-10 rounded-full"
          src={src}
          alt={alt}
        />
      </Button>
    );
  }

  const renderUserMenu = (): JSX.Element | null => (
    <>
      <Divider orientation="vertical" className="bg-gradient-to-b via-white" />
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button
            className="relative flex rounded-full bg-gray-800 text-sm
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            {photo ? (
              <img className="size-10 rounded-full" src={photo} alt={user?.mail || 'Avatar'} />
            ) : (
              <PersonIcon className="size-10" />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg
              ring-1 ring-black ring-opacity-5
              focus:outline-none"
          >
            <Menu.Item>
              <div className="flex flex-row justify-center">
                <Button onClick={logoutHandle} size="medium" variant="transparent">
                  Logout
                </Button>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );

  return (
    <div className="bg-blue-500 min-h-[64px] pl-[1.2rem] pr-[1.2rem] flex flex-row w-full items-center">
      {user && (
        <div className="flex flex-row h-full items-center w-full justify-between">
          <LogoIcon className="w-[6em] h-full" />
          <div className="flex flex-row items-center">
            <TimeTrackerButtonSet />
            {renderUserMenu()}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ApplicationBar);
