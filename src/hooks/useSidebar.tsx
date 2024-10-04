import { atom, useAtom } from "jotai";

const isOpenAtom = atom<boolean>(true);

const statusAtom = atom<boolean>(false);

const toggleSidebarAtom = atom(
  (get) => get(isOpenAtom),
  (get, set) => set(isOpenAtom, !get(isOpenAtom))
);

export const useSidebar = () => {
  const [isOpen, toggle] = useAtom(toggleSidebarAtom);
  const [status, setStatus] = useAtom(statusAtom);
  return { isOpen, toggle, status, setStatus };
};
