import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import App from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
  title: 'TODOLIST/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App demo={true}/>;

export const AppBaseExample = Template.bind({});
AppBaseExample.args = {};

// todo: fix get tasks request and LinearProgress


