import { IDomain } from 'app/shared/model/domain.model';

export const enum FaqType {
  TEXT = 'TEXT',
  LINK = 'LINK',
  PDF = 'PDF'
}

export const enum Language {
  FRENCH = 'FRENCH'
}

export interface IFaq {
  id?: number;
  faqName?: string;
  faqType?: FaqType;
  language?: Language;
  textResponse?: any;
  linkResponse?: string;
  pdfResponseContentType?: string;
  pdfResponse?: any;
  domain?: IDomain;
}

export const defaultValue: Readonly<IFaq> = {};
