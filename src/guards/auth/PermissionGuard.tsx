import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkValidPermission } from '@hiobairo/app-core';
import { DASHBOARD_ROUTES } from '../../routes';

type PermissionGuardProps = {
  permissions: string[];
  children: ReactNode;
};

export function PermissionGuard({ children, permissions }: PermissionGuardProps) {
  const navigate = useNavigate();
  // TODO
  if (checkValidPermission(permissions)) {
    navigate(DASHBOARD_ROUTES.NOTALLOWED);
    return;
  }

  return <>{children}</>;
}
