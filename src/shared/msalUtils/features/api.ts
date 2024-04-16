import msGraphInstance from 'shared/lib/msal/instance';
import { mockUser } from 'shared/utils/constants';
import { getGuestToken as getGuestTokenFromStorage } from 'shared/utils/getGuestToken';

import type { MsUser } from 'common/models/User';

export const getUser = async (): Promise<MsUser> => new Promise<MsUser>(
  (resolve, reject) => {
    if (getGuestTokenFromStorage()) {
      resolve(mockUser);
    }
    msGraphInstance.graphClient.api('/me')
      .select('givenName,mail,surname')
      .get()
      .then((response: MsUser) => resolve(response))
      .catch((error) => reject(error));
  },
);
