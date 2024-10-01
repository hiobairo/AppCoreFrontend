import { DASHBOARD_ROUTES } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { checkValidPermission, useObjectState } from '@hiobairo/app-core';
import React from 'react';
import Iconify from '../../components/iconify/Iconify';

type SettingsStateType = {
  selectedTabIndex: number;
}

const TAB_VALUES = [
  {
    key: 0,
    label: 'General',
    value: 'general',
    path: '',
    icon: '',
    permissions: []
  }
]


export default function Settings(): JSX.Element {
  const navigate = useNavigate();
  const [{
    selectedTabIndex,
  }, updateState] = useObjectState<SettingsStateType>({
    selectedTabIndex: 0,
  })

  const renderTabs = React.useCallback(
    () => (
      <Tabs value={selectedTabIndex} sx={{ width: '100%' }} variant="scrollable" scrollButtons="auto">
        {TAB_VALUES?.filter(tab => checkValidPermission(tab.permissions)).map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            onClick={() => {
              updateState({
                selectedTabIndex: tab.key,
              })
              navigate(tab.path)
            }}
            id={`status-tab-${tab.key}`}
            {...{
              'aria-controls': `status-tabpanel-${tab.key}`,
            }}
            icon={<Iconify icon={tab.icon} fontSize={20} />}
            iconPosition='start'
            sx={{
              pl: 2,
              pr: 2
            }}
          />
        ))}
      </Tabs>
    ),
    [navigate, selectedTabIndex]
  );
  
  return (
    <>
      <BreadCrumbs
        items={[
          {
            name: 'Ajustes',
            url: DASHBOARD_ROUTES.SETTINGS.ROOT,
            icon: '',
          }
        ]}
      />
      <Box>
        {renderTabs()}
      </Box>
    </>
  );
}
