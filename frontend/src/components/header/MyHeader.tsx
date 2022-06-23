import {HeaderProps} from "../interfaces";
import {Burger, Group, Header} from "@mantine/core";
import ThemeSwitch from "../utils/ThemeSwitch";

export const MyHeader = ({opened, setOpened}: HeaderProps) => {
    const title = opened ? 'Close navigation' : 'Open navigation';

    return (
        <Header height={80} p={"xs"}>
            <Group sx={{height: '100%'}} px={20} position="apart">
                <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    title={title}
                    m={10}
                />
                <ThemeSwitch/>
            </Group>
        </Header>
    );
}