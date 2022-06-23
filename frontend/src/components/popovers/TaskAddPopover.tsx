import {useState} from "react";
import {Button, Popover} from "@mantine/core";
import {PencilPlus} from "tabler-icons-react";
import {NewTask, Task, TaskAddPopoverProps} from "../interfaces";
import {TaskForm} from "../forms/TaskForm";


export const TaskAddPopover = ({reload}: TaskAddPopoverProps) => {
    const [opened, setOpened] = useState(false);

    const addTask = async (task: Task | NewTask) => {
        await fetch(`/api/task/`, {
            method: 'POST',
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
                <Button
                    onClick={() => setOpened((o) => !o)}
                >
                    Add new task <PencilPlus size={16}/>
                </Button>
            }
        >
            <TaskForm
                initialValues={new NewTask()}
                onCancel={() => setOpened(false)}
                onSubmit={(task) => {
                    addTask(task);
                    setOpened(false);
                }}
            />
        </Popover>
    );
}