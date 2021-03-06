// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBH7En_vRHHMw0vZlt6GkGgp0_lOvtUqac",
    authDomain: "the-proof-testament.firebaseapp.com",
    databaseURL: "https://the-proof-testament.firebaseio.com",
    projectId: "the-proof-testament",
    storageBucket: "the-proof-testament.appspot.com",
    messagingSenderId: "388835831512"
  },
  apiURL: "http://localhost:4201/scribe/"
};
