# lacatillon

> github pages: https://iamyphar.github.io/lacatillon

## Requirements

-   [Node >= v.20.10.0](https://nodejs.org/en/)

## New project setup

**Replace `lacatillon` with the name of your project. (kebab-case)**

```bash
git clone git@github.com:iamyphar/lacatillon.git lacatillon
cd lacatillon


# setup git
git add .
git commit -m ":tada:"
git remote add origin git@github.com:iamyphar/lacatillon.git
git push origin main
```

Then, delete **New project setup** section from the README file to keep it clean.

## Install dependencies

```bash
yarn install
```

If you have any problems with the sharp library when developing, you can run:

```bash
yarn add sharp --ignore-engines
```

## Development

```bash
# start development at http://localhost:3000
yarn dev
# automatically format files (prettier)
yarn format
# check your js (eslint)
yarn lint
# check your css (stylelint)
yarn lintcss
# auto fix css if possible (stylelint)
yarn lintcss --fix
```

## Preview build

```bash
# build production files for local preview
yarn build
yarn preview
```

## Build

```bash
# build production files
yarn build
```

### Documentation

Anything in the `public` folder will be copied to the into the built assets.

## Deployment

### External Devs: github pages (branch test)

When pushing/merging into `test`, the pipeline will build the project and deploy it to github pages. The url will be `https://iamyphar.github.io/lacatillon`.

### Internal Format-z: Contao website (branch main)

Start by uncommenting the `deploy_production` job in `.github-ci.yml`.

When pushing/merging to `main`, this will automatically trigger a pipeline that should deploy the project to the contao assets.

**Requirements:**

1. Have a `main` branch ready, protected.
2. Have an empty contao website ready on infomaniak
3. Create an SSH key pair (see Notion "Auto deploy github -> infomaniak")
4. Create a github ssh user in infomaniak
5. Add the following variables in github Settings > CI/CD > Variables

-   $DEPLOY_SSH_PRIVATE_KEY : the private key
-   $DEPLOY_SSH_USER : PREFIX_github
-   $DEPLOY_SSH_HOST : PREFIX.ftp.infomaniak.com
-   $DEPLOY_SSH_PATH : 2024/files/
