Project meant to detect errors that surface after the build in a production-like
environment with Theme UI in _node_modules_ and typecheck ran from user's
project.

# Usage

```sh
# ensure Theme UI packages are built
cd ../.. && yarn build

# install dependencies -- package.json contains relative paths to package directories
yarn

# run the script
yarn start
```

# Maintenance

List all packages you want to typecheck in _package.json_ and _index.ts_.
