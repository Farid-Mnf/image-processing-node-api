# image-processing-node-api #
This is a Node API that resizes images.


## App GET request example ##
`http://localhost:3000/api?image=santamonica&width=900&height=900`

## run prettier to format code ##
`npm run prettier` ---> "prettier": "prettier --config .prettierrc \"src/**/*.ts\" --write"

## build typescript code to dist directory ##
`npm run build` ------> "build": "npx tsc"

## lint code errors and warnings ##
`npm run lint` -------> "lint": "eslint ."

## fix code errors with lint-fix##
`npm run lint-fix` ---> "lint-fix": "eslint . --fix"

## run server using nodemon to see updates every code update ##
`npm run start` ------> "start": "nodemon src/index.ts"

## run jasmine to test compiled dist/ code ##
`npm run jasmine` ----> "jasmine": "jasmine"

## build and run jasmine testing at the same command ##
`npm run test` -------> "test": "npm run build && npm run jasmine"