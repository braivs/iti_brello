import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';
import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: 'Button clicked',
    }
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;
// const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />; //old variant

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
  addItem: action('Button clicked')
};


