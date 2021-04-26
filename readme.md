# Union Blue

UnionBlue connects members of the Teamster's Union to lending institutions who can finance Personal Protective Equipment.

## Installing

`git clone` this repository,

`yarn` or `yarn install` to install dependencies

## Config

Create a Google Cloud project, add the Gmail API and configure an OAuth Consent Screen

Use that project in Google's OAuth Playground to get the following tokens and secrets.

Inside /api/ create an 'auth.json' file, in this format:

```json
{
  "data": 
  {
    "email": "some-email@gmail.com",
    "clientId": "xxx.apps.googleusercontent.com",
    "clientSecret": "xxx",
    "refreshToken": "xxx",
    "accessToken": "xxx"
  }
}
```

## Running / Building

`yarn vite` to run frontend

`yarn api` to run backend

`yarn dev` to run both

`yarn build` to pack into /dist/
