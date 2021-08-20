import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";

const changeTaskStatusCallback = action('Change Task Status')
const changeTaskTitleCallback = action('Change Task Title')
const removeTaskCallback = action('Remove Task')

export default {
  title: 'TODOLIST/Task',
  component: Task,
  arg: {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
  },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const args = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTask: removeTaskCallback
}

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
  task: {id: '1', isDone: true, title: 'redux'},
  todolistId: 'todo1'
};
export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
  task: {id: '2', isDone: false, title: 'JS'},
  todolistId: 'todo2'
};

