# Maskinporten Onboarding Frontend

This react project contains the frontend code for the website
currently running at [onboarding.maskinporten.no](https://onboarding.maskinporten.no).

The intent of this website is to simplify the steps needed to get
started with maskinporten.

## Local Development

Deployment of this app is done automatically when new code is merged
to the main branch.

For development locally, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Code examples


`awk '{ gsub(/"/,"\\\"") } 1' java-example | awk '{ print "\x22"$0"\x22,"}'`

To escape " and create a valid json array from the content of java-example-fiel

Alternative openssl-commands to save to keystore

```
openssl req -newkey rsa:2048 -x509 -keyout key.pem -out cert.pem -days 365
openssl pkcs12 -export -in cert.pem -inkey key.pem -out certificate.p12 -name "certificate"
openssl rsa -in key.pem -pubout -out maskinporten.pem.pub
```
