export type ContactType = {
  id?: string;
  createdAt?: number;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  first?: string;
  last?: string;
};

declare module 'react-router-dom' {
  export interface LoaderFunctionArgs {
    params: { contactId: string };
  }
  export interface ActionFunctionArgs {
    params: { contactId: string };
  }
}
