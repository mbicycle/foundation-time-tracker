import { useEffect, useState } from 'react';
import { msalInstance } from 'shared/utils/interceptors';

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
