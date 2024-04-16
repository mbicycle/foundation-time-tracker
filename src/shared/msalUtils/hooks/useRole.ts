import { useEffect, useState } from 'react';
import msGraphInstance from 'shared/lib/msal/instance';

const { msalInstance } = msGraphInstance;

export type UseRoleReturnType = 'admin' | 'god' | 'user' | 'guest';

const useRole = (): { role: UseRoleReturnType | undefined; } => {
  const [role, setRole] = useState<UseRoleReturnType | undefined>();

  const { idTokenClaims } = (msalInstance.getAllAccounts()[0] ?? {});

  const { roles } = idTokenClaims ?? {};

  useEffect(() => {
    if (roles?.length) {
      setRole(roles[0] as UseRoleReturnType);
    } else {
      setRole('user');
    }
  }, [roles]);

  return { role };
};

export default useRole;
