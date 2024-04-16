import React from 'react';

import AppSnackbarProvider from 'common/providers/AppSnackbar/AppSnackbarProvider';

const AppProvider = function ({ children }: { children: React.ReactNode; }): JSX.Element {
  return (
    <AppSnackbarProvider>
      <>
        {' '}
        {children}
      </>
    </AppSnackbarProvider>
  );
};

export default AppProvider;
