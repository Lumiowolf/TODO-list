import {useState} from "react";
import {ActionIcon, Popover} from "@mantine/core";
import {Edit} from "tabler-icons-react";
import {NewTask, Task, TaskUpdatePopoverProps} from "../interfaces";
import {TaskForm} from "../forms/TaskForm";


export const TaskUpdatePopover = ({reload, task}: TaskUpdatePopoverProps) => {
    const [opened, setOpened] = useState(false);

    const updateTask = async (task: Task | NewTask) => {
        if (task instanceof NewTask) return;
        await fetch(`/api/task/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) throw Error(response.status.toString());
            })
            .then(() => {
                reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            placement="end"
            withCloseButton
            title="Modify task"
            transition="pop-top-right"
            closeOnClickOutside={false}
            target={
                <ActionIcon
                    onClick={() => setOpened((o) => !o)}
                >
                    <Edit size={16}/>
                </ActionIcon>
            }
        >
            <TaskForm
                initialValues={task}
                onCancel={() => setOpened(false)}
                onSubmit={(task) => {
                    updateTask(task);
                    setOpened(false);
                }}
            />
        </Popover>
    );
}