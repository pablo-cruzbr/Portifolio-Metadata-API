export interface NavLink {
  id: number;
  url: string;
  label: string;
}

export const NavLinks: NavLink[] = [
  { id: 1, url: "#home", label: "Home" },
  { id: 2, url: "#projetos", label: "Portifólio" },
  { id: 3, url: "https://github.com/pablo-cruzbr", label: "Github" },
  { id: 4, url: "#about", label: "Sobre Mim" },
];
