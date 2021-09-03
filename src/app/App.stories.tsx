import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
  title: 'TODOLIST/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App demo={true}/>;

export const AppStories = Template.bind({});
AppStories.args = {};


