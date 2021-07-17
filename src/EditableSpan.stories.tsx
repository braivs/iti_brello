import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';
import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
  title: 'TODOLISTS/AddItemForm',
  component: EditableSpan,
  argTypes: {
    changeTitle: {
      description: 'Button clicked',
    }
  },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
  title: 'default title',
  changeTitle: action('New text')
};


