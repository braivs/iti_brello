import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddItemForm from "../AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";


export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  argsTypes: {
    onChange: {
      description: 'Value EditableSpan changed'
    },
    value: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan'
    },
  }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
  title: 'default title',
  changeTitle: action('New text')
  // onChange: action('Value EditableSpan changed')
};