interface IConfig {
  serviceName: string,
  env: string,
  db?: {
    name: string,
    url: string
  },
  rmq?: {
    route: string,
    url: string,
    workQueue: string
  }
}
export const config: IConfig = {
  serviceName: 'User Managment Service',
  env: process.env.ENV ?? 'dev',
  db: {
    name: process.env.MONGO_DB_NAME,
    url: process.env.MONGO_DB_URL
  },
  rmq: {
    route: process.env.RMQ_ROUTE,
    url: process.env.RMQ_URL,
    workQueue: process.env.RMQ_WORKQUEUE
  }
};
