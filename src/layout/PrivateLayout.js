import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { AppIconButton, ErrorBoundary } from '../components';
import { useOnMobile } from '../hooks/layout';
import {
  SIDEBAR_DESKTOP_ANCHOR,
  SIDEBAR_MOBILE_ANCHOR,
  SIDEBAR_WIDTH,
  TOPBAR_DESKTOP_HEIGHT,
  TOPBAR_MOBILE_HEIGHT,
} from './config';
import TopBar from './TopBar/TopBar';
import SideBar from './SideBar/SideBar';

// TODO: change to your app name or other word
const TITLE_PRIVATE = 'Krishna Chemical & Mineral'; // Title for pages after authentication

/**
 * SideBar navigation items with links
 */
const SIDEBAR_ITEMS = [
  {
    title: 'Welcome',
    path: '/welcome',
    icon: 'home',
  },
  {
    title: 'Coal',
    path: '/coal',
    icon: 'home',
  },
  {
    title: 'Stone',
    path: '/stone',
    icon: 'home',
  },
  {
    title: 'Lime',
    path: '/lime',
    icon: 'home',
  },
  {
    title: 'Tools',
    path: '/tools',
    icon: 'tools',
  },
  {
    title: 'About',
    path: '/about',
    icon: 'info',
  },
  // {
  //   title: 'Dev Tools',
  //   path: '/dev',
  //   icon: 'settings',
  // },
];

/**
 * Renders "Private Layout" composition
 * @component PrivateLayout
 */
const PrivateLayout = ({ children }) => {
  const navigation = useNavigate();
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const onMobile = useOnMobile();

  // Variant 1 - Sidebar is static on desktop and is a drawer on mobile
  const sidebarOpen = onMobile ? sideBarVisible : true;
  const sidebarVariant = onMobile ? 'temporary' : 'persistent';

  // Variant 2 - Sidebar is drawer on mobile and desktop
  // const sidebarOpen = sideBarVisible;
  // const sidebarVariant = 'temporary';

  const title = TITLE_PRIVATE;
  document.title = title; // Also Update Tab Title

  const onLogoClick = useCallback(() => {
    // Navigate to first SideBar's item or to '/' when clicking on Logo/Menu icon when SideBar is already visible
    navigation(SIDEBAR_ITEMS?.[0]?.path || '/');
  }, [navigation]);

  const onSideBarOpen = () => {
    if (!sideBarVisible) setSideBarVisible(true); // Don't re-render Layout when SideBar is already open
  };

  const onSideBarClose = () => {
    if (sideBarVisible) setSideBarVisible(false); // Don't re-render Layout when SideBar is already closed
  };

  // console.log(
  //   'Render using PrivateLayout, onMobile:',
  //   onMobile,
  //   'sidebarOpen:',
  //   sidebarOpen,
  //   'sidebarVariant:',
  //   sidebarVariant
  // );

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100vh', // Full screen height
        paddingTop: onMobile ? TOPBAR_MOBILE_HEIGHT : TOPBAR_DESKTOP_HEIGHT,
        paddingLeft: sidebarOpen && SIDEBAR_DESKTOP_ANCHOR.includes('left') ? SIDEBAR_WIDTH : 0,
        paddingRight: sidebarOpen && SIDEBAR_DESKTOP_ANCHOR.includes('right') ? SIDEBAR_WIDTH : 0,
      }}
    >
      <Stack component="header">
        <TopBar
          startNode={<AppIconButton icon="home" onClick={sidebarOpen ? onLogoClick : onSideBarOpen} />}
          title={title}
        />

        <SideBar
          anchor={onMobile ? SIDEBAR_MOBILE_ANCHOR : SIDEBAR_DESKTOP_ANCHOR}
          open={sidebarOpen}
          variant={sidebarVariant}
          items={SIDEBAR_ITEMS}
          onClose={onSideBarClose}
        />
      </Stack>

      <Stack
        component="main"
        sx={{
          flexGrow: 1, // Takes all possible space
          paddingLeft: 1,
          paddingRight: 1,
          paddingTop: 1,
        }}
      >
        <ErrorBoundary name="Content">{children}</ErrorBoundary>
      </Stack>
    </Stack>
  );
};

export default PrivateLayout;
