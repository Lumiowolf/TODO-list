import {Task, TaskFormProps} from "../interfaces";
import {useEffect, useState} from "react";
import {Category} from "../navbar/MyNavbar";
import {useForm, useMediaQuery} from "@mantine/hooks";
import {Anchor, Button, Group, Select, Textarea, TextInput} from "@mantine/core";
import {DatePicker, TimeInput} from "@mantine/dates";
import {Clock} from "tabler-icons-react";

export const TaskForm = ({initialValues, onSubmit, onCancel}: TaskFormProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const isMobile = useMediaQuery('(max-width: 755px');

    const loadCategories = async () => {
        await fetch('/api/category', {
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
                setCategories(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const loadTasks = async () => {
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
    }

    useEffect(() => {
        loadCategories();
        loadTasks();
    }, [])

    const form = useForm({
        initialValues
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                required
                label="Name"
                placeholder="Name"
                style={{minWidth: isMobile ? 220 : 300}}
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                error={form.errors.name}
                variant="default"
            />

            <Textarea
                label="Description"
                placeholder="Description"
                style={{minWidth: isMobile ? 220 : 300}}
                value={form.values.description ? form.values.description : ""}
                onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                error={form.errors.description}
                variant="default"
            />
            <Group>
                <DatePicker
                    clearable
                    label={"Deadline date"}
                    style={{minWidth: isMobile ? 220 : 300}}
                    value={form.values.deadline ? new Date(form.values.deadline) : null}
                    onChange={(event) => (
                        event ? form.setFieldValue('deadline', event) : form.setFieldValue('deadline', null)
                    )}
                    error={form.errors.deadline}
                    variant="default"
                />
                <TimeInput
                    clearable
                    label={"Deadline time"}
                    icon={<Clock size={16}/>}
                    style={{minWidth: isMobile ? 220 : 300}}
                    value={form.values.deadline ? new Date(new Date(form.values.deadline).getTime()) : null}
                    onChange={(event) => (
                        event ? form.setFieldValue('deadline', form.values.deadline ? new Date(new Date(new Date(form.values.deadline).setHours(event.getHours())).setMinutes(event.getMinutes())) : new Date(event)) : form.setFieldValue('deadline', null)
                    )}
                    error={form.errors.deadline}
                    variant="default"
                />
            </Group>

            <Select
                clearable
                label="Pick category"
                placeholder="Pick one"
                data={categories.map((category) => (
                    {value: category.name, label: category.name}
                ))}
                style={{minWidth: isMobile ? 220 : 300}}
                value={form.values.categoryName}
                onChange={(event) => form.setFieldValue('categoryName', event)}
                error={form.errors.categoryName}
                variant="default"
            />
            <Select
                clearable
                label="Pick parent task"
                placeholder="Pick one"
                data={tasks.filter((task) => ("id" in form.values ? task.id !== form.values["id"] : true)).map((task) => (
                    {value: task.id, label: task.name}
                ))}
                style={{minWidth: isMobile ? 220 : 300}}
                value={form.values.parentTaskId}
                onChange={(event) => form.setFieldValue('parentTaskId', event)}
                error={form.errors.parentTaskId}
                variant="default"
            />
            <Group position="apart" style={{marginTop: 15}}>
                <Anchor component="button" color="gray" size="sm" onClick={onCancel}>
                    Cancel
                </Anchor>
                <Button type="submit" size="sm">
                    Save
                </Button>
            </Group>
        </form>
    );
}