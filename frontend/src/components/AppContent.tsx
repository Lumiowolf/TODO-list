import {Anchor, AppShell, Footer} from "@mantine/core";
import {useState} from "react";
import Main from "./main/Main";
import {MyNavbar} from "./navbar/MyNavbar";
import {MyHeader} from "./header/MyHeader";


const AppContent = () => {
    const [opened, setOpened] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <AppShell
            fixed
            navbarOffsetBreakpoint="sm"
            header={<MyHeader opened={opened} setOpened={setOpened}/>}
            navbar={<MyNavbar opened={opened} setSelectedCategory={setSelectedCategory}/>}
            padding={"md"}
        >
            <Main selectedCategory={selectedCategory}/>
            <Footer height={80} p={10}>
                © 2022 Bartosz Sosnowski <Anchor href={"https://github.com/Lumiowolf/TODO-list.git"}>GitHub</Anchor>
            </Footer>
        </AppShell>
    );

}

export default AppContent;