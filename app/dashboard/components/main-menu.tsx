import MenuTitle from "./menu-title";

const MainMenu = () => {
  return (
    <div className="bg-muted p-4 overflow-auto">
      <header className="hidden md:block border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
    </div>
  );
};

export default MainMenu;
