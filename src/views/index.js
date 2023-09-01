import React from 'react';
/**
 * Note: Don't import/export all Views directly, use lazy loading!
 */
import { withSuspense } from '../components';
import NotFoundView from './NotFoundView';
import NotImplementedView from './NotImplementedView';

/**
 * Views/Pages with Lazy Loading
 */
const WelcomeView = withSuspense(React.lazy(() => import('./Welcome')));
const AboutView = withSuspense(React.lazy(() => import('./About')));
const CoalList = withSuspense(React.lazy(() => import('./Coal')));
const StoneList = withSuspense(React.lazy(() => import('./Stone')));
const LimeList = withSuspense(React.lazy(() => import('./Lime')));
const ToolsView = () => <NotImplementedView name="Tools" />; // Sample of non-implemented View
const UserView = () => <NotImplementedView name="User" />; // Sample of non-implemented View

export { NotFoundView, AboutView, WelcomeView, UserView, ToolsView, CoalList, StoneList, LimeList };
