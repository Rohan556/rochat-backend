const config: any = {
  nest: {
    port: parseInt(process.env.PORT, 10) || 3030,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'NestJS Seed',
    description: 'The NestJS Seed API description',
    version: '1.0',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '365 days',
    refreshesIn: '365 days',
    bcryptSaltOrRound: 10,
  },
};

export default () => config;
