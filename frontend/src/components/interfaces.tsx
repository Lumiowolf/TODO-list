export interface TaskUpdatePopoverProps {
    reload(): void;
    task: Task;
}

export interface TaskAddPopoverProps {
    reload(): void;
}

export interface TaskDetailsPopoverProps {
    task: Task;
}

export interface TaskFormProps {
    initialValues: Task | NewTask;
    onSubmit(values: Task | NewTask): void;
    onCancel(): void;
}

export interface MainProps {
    selectedCategory: string | null;
}

export interface Task {
    id: string;
    name: string;
    deadline: Date | null;
    description: string | null;
    reminders: Date[] | null;
    priority: number | null;
    categoryName: string | null;
    parentTaskId: string | null;
    done: boolean;
    creationDate: Date[];
}

export interface SortConfigType {
    key: keyof Task;
    direction: string;
}

export class NewTask {
    name="";
    deadline=new Date();
    description=null;
    reminders=null;
    priority=null;
    categoryName=null;
    parentTaskId=null;
}

export interface HeaderProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}