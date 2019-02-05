# Using TypeScript project references in a monorepo

The scenario is that we have multiple lambdas all referencing multiple shared libraries, all in a monorepo. We want fast build times and don't want to recompile our libraries over and over again.

## Enter TypeScript 3 Project references.

This example repository shows them working. We are also then using webpack to build a lean distributable for each lambda.

(*) Ideally we would have this in 1 process (just webpack running the typescript build step) however `ts-loader` doesn't yet support incremental builds (1) (because until very recently this behaviour was only available from tunning tsc from the cli instead of programmatically (2).

As soon as `ts-loader` supports incremental builds we can remove the initial `tsc --build` from the shell script.

(1) [https://github.com/TypeStrong/ts-loader/issues/851](https://github.com/TypeStrong/ts-loader/issues/851)

(2) [https://github.com/Microsoft/TypeScript/pull/29161](https://github.com/Microsoft/TypeScript/pull/29161)

## See it working

 1. Run `npm install` to get typescript and webpack locally.
 2. Run `npm start` to build then bundle, then test the 2 'lambdas'.
 3. The first time you will notice the output says that it's building the dependencies.
 4. Run `npm start` again and notice it doesn't have to rebuild the dependencies yay! ( "Project 'modules/library1/tsconfig.json' is up to date" )

## Other things of note

 * Note I am not using yarn workspaces or lerna here. This should now be a separate concern and only of use to have npm modules defined at the library level or for publishing. Our local references are all typescript refs and handled by project references in the `tsconfig.json`. So even if workspaces or lerna ARE brought in, the package dependencies should only be used for external dependencies. No bootstrapping is required.
 
 * we are using path aliases in both the tsconfig and the webpack config so we don't need ugly '../' in our imports. This also helps us from a 'governance' pov - i.e. we are more explicit about which libraries we are allowed to import from (based on the path aliases in the typescript config)
 
 * sourcemapping should work fine as the tsconfig and the webpack modules are both dealing with sourcemaps (naturally to get sourcemapping working in stack traces on node/lambda you will need to use the `source-map-support` library)
