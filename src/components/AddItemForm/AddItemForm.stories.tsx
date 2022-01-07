import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
  addItem: action('AddItemForm clicked')
};
export const AddItemFormDisabledBaseExample = Template.bind({});
AddItemFormDisabledBaseExample.args = {
  addItem: action('AddItemForm clicked'),
  disabled: true
};