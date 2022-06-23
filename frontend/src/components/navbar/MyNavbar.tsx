import {useCallback, useEffect, useState} from "react";
import {Anchor, Button, Group, Navbar, Popover, ScrollArea, TextInput, Transition, Select} from "@mantine/core";
import {useMediaQuery, useForm} from "@mantine/hooks";

interface NavbarProps {
    opened: boolean;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface Category {
    name: string;
}

export const MyNavbar = ({opened, setSelectedCategory}: NavbarProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<string>("");
    const [deletedCategory, setDeletedCategory] = useState<string>("");

    const loadCategories = useCallback(async () => {
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
    }, [newCategory, deletedCategory])

    useEffect(() => {
        loadCategories();
    }, [loadCategories])

    return (
        <Transition transition={'slide-right'} mounted={opened}>
            {(styles) => (
                <Navbar
                    fixed
                    p={20}
                    width={{base: '80%', xs: 300}}
                    style={{...styles}}
                >
                    <Navbar.Section mt="xs">
                        <Group direction={"column"} grow>
                            <CategoryAddPopover setNewCategory={setNewCategory}/>
                            <CategoryDeletePopover setSelectedCategory={setSelectedCategory} setDeletedCategory={setDeletedCategory} categories={categories}/>
                        </Group>
                    </Navbar.Section>
                    <Navbar.Section grow component={ScrollArea} mt="lg">
                        <Group>
                            <Button fullWidth onClick={() => setSelectedCategory(null)}>Show all</Button>
                            {categories.map((category) => (
                                <Button
                                    onClick={() => (setSelectedCategory(category.name))}
                                    fullWidth variant="light"
                                    key={category.name}
                                    value={category.name}
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </Group>
                    </Navbar.Section>
                </Navbar>
            )}
        </Transition>
    )
}

interface CategoryAddProps {
    initialValues: { name: string; };

    onSubmit(values: { name: string; }): void;

    onCancel(): void;
}

interface CategoryDeleteProps {
    initialValues: { id: string; };

    onSubmit(values: { id: string; }): void;

    onCancel(): void;

    categories: Category[];
}

interface CategoryType {
    name: string
}

interface CategoryAddPopoverProps {
    setNewCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategoryAddForm = ({initialValues, onSubmit, onCancel}: CategoryAddProps) => {
    const isMobile = useMediaQuery('(max-width: 755px');

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

            <Group position="apart" style={{marginTop: 15}}>
                <Anchor component="button" color="gray" size="sm" onClick={onCancel}>
                    Cancel
                </Anchor>
                <Button type="submit" size="sm">
                    Add
                </Button>
            </Group>
        </form>
    );
}

const CategoryAddPopover = ({setNewCategory}: CategoryAddPopoverProps) => {
    const [opened, setOpened] = useState(false);

    const addCategory = async (category: CategoryType) => {
        await fetch("/api/category", {
            method: 'POST',
            body: JSON.stringify({
                name: category.name,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status.toString());
            })
            .then(() => {
                setNewCategory(category.name);
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
            title="Add category"
            transition="pop-top-right"
            target={
                <Button fullWidth onClick={() => setOpened((o) => !o)}>+ Add category</Button>
            }
        >
            <CategoryAddForm
                initialValues={{name: ''}}
                onCancel={() => setOpened(false)}
                onSubmit={(data) => {
                    addCategory(data);
                    setOpened(false);
                }}
            />
        </Popover>
    );
}

const CategoryDeleteForm = ({initialValues, onSubmit, onCancel, categories}: CategoryDeleteProps) => {
    const isMobile = useMediaQuery('(max-width: 755px');

    const form = useForm({
        initialValues
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Select
                required
                label="Pick category to delete"
                placeholder="Pick one"
                data={categories.map((category) => (
                    {value: category.name, label: category.name}
                ))}
                style={{minWidth: isMobile ? 220 : 300}}
                value={form.values.id}
                onChange={(event) => event ? form.setFieldValue('id', event) : null}
                error={form.errors.id}
                variant="default"
            />


            <Group position="apart" style={{marginTop: 15}}>
                <Anchor component="button" color="gray" size="sm" onClick={onCancel}>
                    Cancel
                </Anchor>
                <Button color={"red"} type="submit" size="sm">
                    Delete
                </Button>
            </Group>
        </form>
    );
}

interface CategoryDeletePopoverProps {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    setDeletedCategory: React.Dispatch<React.SetStateAction<string>>;
    categories: Category[];
}

const CategoryDeletePopover = ({setSelectedCategory, setDeletedCategory, categories}: CategoryDeletePopoverProps) => {
    const [opened, setOpened] = useState(false);

    const removeCategory = async (id: string) => {
        if (id.length > 0) {
            await fetch(`/api/category/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (!response.ok) throw new Error(response.status.toString());
                })
                .then(() => {
                    setSelectedCategory(null);
                    setDeletedCategory(id);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            position="bottom"
            placement="end"
            withCloseButton
            title="Delete category"
            transition="pop-top-right"
            target={
                <Button fullWidth onClick={() => setOpened((o) => !o)}>- Delete category</Button>
            }
        >
            <CategoryDeleteForm
                initialValues={{id: ''}}
                onCancel={() => setOpened(false)}
                onSubmit={(data) => {
                    removeCategory(data.id);
                    setOpened(false);
                }}
                categories={categories}
            />
        </Popover>
    );
}