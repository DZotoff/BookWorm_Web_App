export const checkEnvironmentVariables = (): void => {
  const requiredEnvironmentVariables: string[] = [
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_DATABASE',
  ];

  const missing: string[] = requiredEnvironmentVariables.filter((env) => !process.env[env]);
  if (missing && missing.length > 0) {
    console.error(`The following required environment variables are missing: \
      ${missing.join(', ')}`);
    process.exit(1);
  }
};
