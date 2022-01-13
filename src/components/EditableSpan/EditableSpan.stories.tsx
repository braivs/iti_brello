import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


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
  value: "StartValue",
  onChange: action('value changed')
  // onChange: action('Value EditableSpan changed')
};