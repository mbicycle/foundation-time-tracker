import { BrowserRouter } from 'react-router-dom';
import { InteractionType } from '@azure/msal-browser';
import {
  AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate,
  useMsalAuthentication,
} from '@azure/msal-react';
import Login from 'shared/msalUtils/widgets/Login';
import { msalInstance } from 'shared/utils/interceptors';

import ApplicationBar from 'containers/application-bar';
import TimeTracker from 'containers/time-tracker';
import MainWrapper from 'common/components/main-wrapper';
import ReactQueryProvider from 'common/providers/ReactQueryProvider';

const AppRender = function (): JSX.Element {
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
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
