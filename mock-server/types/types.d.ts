declare module 'graphql' {
  export function subscribe(): any;

  export function execute(): any;
}

export interface ServicesResolver {
  [name: string]: { url: string, userResolver: (userData: any) => Promise<any> };
}

