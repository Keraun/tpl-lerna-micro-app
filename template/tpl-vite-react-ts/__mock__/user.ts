import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/user',
    method: 'get',
    response: () => ({
      code: 200,
      data: { name: 'Mock User', id: 1 },
    }),
  },
] as MockMethod[];
