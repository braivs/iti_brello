import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';
import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskType} from "./AppWithRedux";

export default {
  title: 'TODOLISTS/Task',
  component: Task,
  /*args: {
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
    removeTask: action('removeTask'),
  }*/
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

let changeTaskStatusCallback = action('changeTaskStatus')
let changeTaskTitleCallback = action('changeTaskTitle')
let removeTaskCallback = action('removeTask')

const baseArgs = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTask: removeTaskCallback
}

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
  ...baseArgs,
  task: {id: '11', isDone: true, title: 'JS'},
  todoListID: '1'
};

export const TaskIsNoteDoneStories = Template.bind({});
TaskIsNoteDoneStories.args = {
  ...baseArgs,
  task: {id: '12', isDone: false, title: 'JS'},
  todoListID: '1'
};


