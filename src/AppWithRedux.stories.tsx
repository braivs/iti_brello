import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AddItemForm from "./AddItemForm";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: 'TODOLISTS/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {

};


