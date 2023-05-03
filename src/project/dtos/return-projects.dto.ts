export type ReturnProjectsDTO = {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  position: number | null;
  badges: { name: string; image: string }[];
  links: { id: number; label: string; href: string }[];
}[];
