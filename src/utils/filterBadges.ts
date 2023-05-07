import { Badge } from '@prisma/client';

export function filterBadges(allBadges: Badge[], filterBadges: string[]) {
  const hash = {} as Record<string, boolean>;
  const arrFilter = [] as string[];

  for (let i = 0; i < allBadges.length; i++) {
    hash[allBadges[i].name] = true;
  }

  for (let i = 0; i < filterBadges.length; i++) {
    if (hash[filterBadges[i]]) continue;

    arrFilter.push(filterBadges[i]);
  }

  return arrFilter;
}
