import {useState} from "react";
import {ActionIcon, Popover} from "@mantine/core";
import {InfoCircle} from "tabler-icons-react";
import {TaskDetailsPopoverProps} from "../interfaces";
import ReactMarkdown from "react-markdown";


export const TaskDetailsPopover = ({task}: TaskDetailsPopoverProps) => {
    const [opened, setOpened] = useState(false);

    return (
        <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            placement="end"
            withCloseButton
            title="Task description"
            transition="pop-top-right"
            target={
                <ActionIcon
                    onClick={() => setOpened((o) => !o)}
                >
                    <InfoCircle size={16}/>
                </ActionIcon>
            }
        >
            {task.description && <ReactMarkdown children={task.description}/>}
        </Popover>
    );
}