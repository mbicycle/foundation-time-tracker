import type { AuthContextValue, AuthProviderConfig } from 'react-query-auth';
import { initReactQueryAuth } from 'react-query-auth';
import { loginFn, logoutFn } from '@mbicycle/msal-bundle';
import { CONFIG } from 'shared/config/envConfig';
import msGraphInstance from 'shared/lib/msal/instance';
import { getUser } from 'shared/msalUtils/features/api';

import type { MsUser } from 'common/models/User';

async function loadUser(): Promise<MsUser> {
  try {
    return await getUser();
  } catch (error) {
    return Promise.reject(error);
  }
}

const authConfig: AuthProviderConfig<MsUser, unknown> = {
  loadUser,
  loginFn: () => loginFn(msGraphInstance.msalInstance) as unknown as Promise<MsUser>,
  registerFn: async (user: MsUser) => user,
  logoutFn: () => logoutFn(msGraphInstance.msalInstance, `${CONFIG.redirectUri}?logout=true`),
};

const { AuthProvider, useAuth: MsAuth } = initReactQueryAuth<MsUser>(authConfig);

const useAuth = (): AuthContextValue<MsUser, unknown, unknown, unknown> | { user: MsUser } => MsAuth();
export { AuthProvider, useAuth };
