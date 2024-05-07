import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import type { IPublicClientApplication } from '@azure/msal-browser';
import {
  AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate,
} from '@azure/msal-react';
import msGraphInstance from 'shared/lib/msal/instance';

import ApplicationBar from 'containers/application-bar';
import Login from 'containers/login';
import TimeTracker from 'containers/time-tracker';
import MainWrapper from 'common/components/main-wrapper';
import ReactQueryProvider from 'common/providers/ReactQueryProvider';

export const AUTH_COOKIE_NAME = 'msalUserEmail';

const AppRender = function (): JSX.Element {
  const [{ msalUserEmail }] = useCookies([AUTH_COOKIE_NAME]);

  useEffect(() => {
    if (msalUserEmail) {
      msGraphInstance.ssoSilent(msalUserEmail);
    } else {
      msGraphInstance.msalInstance.clearCache();
    }
  }, [msalUserEmail]);

  return (
    <BrowserRouter>
      <MsalProvider instance={msGraphInstance.msalInstance as unknown as IPublicClientApplication}>
        <UnauthenticatedTemplate>
          <Login />
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <ReactQueryProvider>
            <ApplicationBar />
            <MainWrapper>
              <TimeTracker />
            </MainWrapper>
          </ReactQueryProvider>
        </AuthenticatedTemplate>
      </MsalProvider>
    </BrowserRouter>
  );
};

export default AppRender;
