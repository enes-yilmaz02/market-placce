import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Button",
    variant: "danger",
  },
};

export const Loading: Story = {
  args: {
    children: "Button",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};
