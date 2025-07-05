// src/types.ts or inline in init.ts/server.ts


export type Method = 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export type LowercaseMethod = Lowercase<Method>; 

export type Route = {
  method: Method;
  path: string;
  status?: number; // optional, defaults to 200
  response: Record<string, any>; // or: unknown or any depending on your needs
};

export type MockiniConfig = {
  port: number;
  routes: Route[];
};

