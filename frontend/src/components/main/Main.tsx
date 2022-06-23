import {useCallback, useEffect, useMemo, useState} from 'react';
import {ActionIcon, Box, Button, Checkbox, Group, Table} from "@mantine/core";
import {TaskUpdatePopover} from "../popovers/TaskUpdatePopover";
import {MainProps, SortConfigType, Task} from '../interfaces';
import {Trash} from "tabler-icons-react";
import {TaskAddPopover} from '../popovers/TaskAddPopover';
import {TaskDetailsPopover} from "../popovers/TaskDetailsPopover";

const Main = ({selectedCategory}: MainProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfigType>({key: 'creationDate', direction: 'desc'})
    const [showDetailsFor, setShowDetailsFor] = useState<string>("");

    const reload = () => {
        loadTasks();
    }

    const loadTasks = useCallback(async () => {
        await fetch('/api/task', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) throw Error(response.status.toString());
                return response.json();
            })
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [selectedCategory])

    const deleteTask = async (id: string) => {
        await fetch(`/api/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) throw Error(response.status.toString());
                reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const requestSort = (key: keyof Task) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    }

    const sortTasks = useMemo(() => {
        let tasksCopy = tasks;
        tasksCopy.sort((task1, task2) => {
            const task1SortedBy = task1[sortConfig.key];
            const task2SortedBy = task2[sortConfig.key];
            if (task1SortedBy === null || task2SortedBy == null) return 0;
            if (task1SortedBy < task2SortedBy) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (task1SortedBy > task2SortedBy) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        })
        setTasks(tasksCopy);
        return tasks;
    }, [sortConfig, tasks])

    const reverseTaskDone = async (task: Task) => {
        task.done = !task.done;
        setDone(task);
    }

    const setDone = async (task: Task) => {
        await fetch(`/api/task/set-done/${task.id}/${task.done}`, {
            method: 'PATCH',
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

    useEffect(() => {
        loadTasks();
    }, [loadTasks, showDetailsFor])

    return (
        <Box>
            <TaskAddPopover reload={reload}/>
            <Group direction={"column"} grow>
                <Table striped highlightOnHover>
                    <thead>
                    <tr>
                        <th>
                            <Button variant={"subtle"} onClick={() => requestSort("done")}>Done</Button>
                        </th>
                        <th>
                            <Button fullWidth variant={"subtle"} onClick={() => requestSort("name")}>Name</Button>
                        </th>
                        <th>
                            <Button fullWidth variant={"subtle"}
                                    onClick={() => requestSort("categoryName")}>Category</Button>
                        </th>
                        <th>
                            <Button fullWidth variant={"subtle"}
                                    onClick={() => requestSort("deadline")}>Deadline</Button>
                        </th>
                        <th>
                            <Button fullWidth variant={"subtle"}
                                    onClick={() => requestSort("priority")}>Priority</Button>
                        </th>
                        <th>
                            Modify
                        </th>
                        <th>
                            Delete
                        </th>
                        <th>
                            Details
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        ((!selectedCategory || task.categoryName === selectedCategory) && (
                            <tr key={task.id}
                                onClick={() => showDetailsFor !== task.id ? setShowDetailsFor(task.id) : setShowDetailsFor("")}>
                                <td>
                                    <Checkbox
                                        checked={task.done}
                                        onChange={() => (reverseTaskDone(task))}
                                    />
                                </td>
                                <td>
                                    {task.name}
                                </td>
                                <td>
                                    {task.categoryName}
                                </td>
                                <td>
                                    {task.deadline ? new Date(task.deadline).toLocaleString() : null}
                                </td>
                                <td>
                                    {task.priority}
                                </td>
                                <td>
                                    <TaskUpdatePopover reload={reload} task={task}/>
                                </td>
                                <td>
                                    <ActionIcon onClick={() => deleteTask(task.id)}><Trash/></ActionIcon>
                                </td>
                                <td>
                                    <TaskDetailsPopover task={task}/>
                                </td>
                            </tr>))
                    ))}
                    </tbody>
                </Table>
            </Group>
        </Box>
    );
}

export default Main;

