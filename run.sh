#!/bin/bash
set -e
rm -rf dist
npx webpack
echo running 'lambda' 1...
node dist/lambda1.js
echo running 'lambda' 2...
node dist/lambda2.js
