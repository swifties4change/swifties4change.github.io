# Local Development

This project uses ddev for local development.

## Step 1 - Clone the project
Clone this project locally

## Step 2 - Install dependencies
Install dependencies by running the following command from your terminal.
```bash
composer install
```

## Step 3 - Build the frontend
Run `npm i` to install node dependencies. This project uses the following versions:
```bash
lstahl@lynn:~/$ npm -v
8.15.0
lstahl@lynn:~/$ node -v
v18.7.0
lstahl@lynn:~/$ gulp -v
CLI version: 2.3.0
Local version: 4.0.2
```

- After npm is installed you can build assets by running 
```bash
npx gulp
```
