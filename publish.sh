#!/bin/bash

pnpm i

pnpm run test
pnpm run lint

rm -rf ./lib/

pnpm run build

# publish
npm version patch # next version
npm publish --access public
