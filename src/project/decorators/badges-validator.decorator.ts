import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isString,
  isURL,
} from 'class-validator';

export interface Badge {
  name: string;
  image: string;
}

@ValidatorConstraint({ name: 'IsBadgeArray' })
export class IsBadgeArray implements ValidatorConstraintInterface {
  validate(badges: (string | Badge)[]) {
    for (const badge of badges) {
      if (isString(badge)) continue;

      if (!badge.name || !badge.image) return false;

      if (!isURL(badge.image)) return false;
    }
    return true;
  }

  defaultMessage() {
    return 'O campo badges deve ser um array de string ou de um objeto {name: string, image: string (URL)}';
  }
}
