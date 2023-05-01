export interface ProjectEntity {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  position: number | null;
  badges: { name: string; image: string; created_at: Date; updated_at: Date }[];
  links: {
    id: number;
    label: string;
    href: string;
    created_at: Date;
    updated_at: Date;
  }[];
  created_at: Date;
  updated_at: Date;
}
