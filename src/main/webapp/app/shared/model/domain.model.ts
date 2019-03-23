import { IDomain } from 'app/shared/model/domain.model';

export const enum Language {
  FRENCH = 'FRENCH'
}

export interface IDomain {
  id?: number;
  domainName?: string;
  language?: Language;
  parentDomain?: IDomain;
}

export const defaultValue: Readonly<IDomain> = {};
