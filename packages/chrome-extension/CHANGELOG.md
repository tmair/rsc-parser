# @rsc-parser/chrome-extension

## 0.4.2

### Patch Changes

- 5356856: Only show links for which there are nodes in FlightResponseTabNetwork
- Updated dependencies [5356856]
  - @rsc-parser/core@0.4.2

## 0.4.1

### Patch Changes

- e129d14: Specify files in @rsc-parser/core
- Updated dependencies [e129d14]
  - @rsc-parser/core@0.4.1

## 0.4.0

### Minor Changes

- 61a3d5a: Expose `unstable_Viewer`

### Patch Changes

- Updated dependencies [61a3d5a]
  - @rsc-parser/core@0.4.0

## 0.3.1

### Patch Changes

- 4542777: Fix Chrome Extension bundling
- e09465a: Add typecheck command
- 4f48e76: Add format command everywher
- ed20b59: Remove console logs
- Updated dependencies [4542777]
- Updated dependencies [e09465a]
- Updated dependencies [4f48e76]
- Updated dependencies [ed20b59]
  - @rsc-parser/core@0.3.1

## 0.3.0

### Minor Changes

- f313d13: Compile Chrome extension scripts using Vite
- ee03219: Move fetch patching code to @rsc-parser/core
- 4d0f42e: Added support for server actions

### Patch Changes

- 2cd0dd4: Export `unstable_createFlightResponse`
- 2836e57: Add a button to read Next.js payload script tags
- faa158f: Export `unstable_createFlightResponse`
- Updated dependencies [f313d13]
- Updated dependencies [2cd0dd4]
- Updated dependencies [2836e57]
- Updated dependencies [ee03219]
- Updated dependencies [faa158f]
- Updated dependencies [4d0f42e]
  - @rsc-parser/core@0.3.0

## 0.2.4

### Patch Changes

- 71e069c: Set a higher z-index for the BottomPanel when when open
- Updated dependencies [71e069c]
  - @rsc-parser/core@0.2.4

## 0.2.3

### Patch Changes

- f181ce8: Scope styles for RscDevtoolsPanel
- 39e168a: Stop wrapping <style> in <head> in RscDevtoolsPanel
- Updated dependencies [f181ce8]
- Updated dependencies [39e168a]
  - @rsc-parser/core@0.2.3

## 0.2.2

### Patch Changes

- 268463a: Make @rsc-parser/core dependency in @rsc-parser/embedded a dev dependency
- Updated dependencies [268463a]
  - @rsc-parser/core@0.2.2

## 0.2.1

### Patch Changes

- f7390f2: Make @rsc-parser/embedded non-private
- Updated dependencies [f7390f2]
  - @rsc-parser/core@0.2.1

## 0.2.0

### Minor Changes

- cbfa10f: Move some UI previously defined in @rsc-parser/chrome-extension into @rsc-parser/core
- c4d4a03: Introduce @rsc-parser/embedded and @rsc-parser/embeded-example
- 583cf09: Create a `useRscMessages` hook

### Patch Changes

- Updated dependencies [cbfa10f]
- Updated dependencies [c4d4a03]
- Updated dependencies [583cf09]
  - @rsc-parser/core@0.2.0

## 0.1.15

### Patch Changes

- 38bff39: Use `chunk` name instead of `row`
- d621e61: Improved rendering for unknown chunks #771
- d621e61: Added more data to `originalValue` #772
- 1207d60: Add network graph tab to FlightResponse
- d621e61: Added support for debug info chunks #769
- Updated dependencies [38bff39]
- Updated dependencies [d621e61]
- Updated dependencies [d621e61]
- Updated dependencies [1207d60]
- Updated dependencies [d621e61]
  - @rsc-parser/core@0.1.15

## 0.1.14

### Patch Changes

- ecb36c4: Fix extension button color in light mode
- Updated dependencies [ecb36c4]
  - @rsc-parser/core@0.1.14

## 0.1.13

### Patch Changes

- f6ed105: Stop rendering the end time
- Updated dependencies [f6ed105]
  - @rsc-parser/core@0.1.13

## 0.1.12

### Patch Changes

- 8dede95: Made font sizes more consistent
- Updated dependencies [8dede95]
  - @rsc-parser/core@0.1.12

## 0.1.11

### Patch Changes

- 611207b: Integrate parser from the ReactFlightClient source
- c3240e7: Remove unuzed zod dependency
- Updated dependencies [611207b]
- Updated dependencies [c3240e7]
  - @rsc-parser/core@0.1.11

## 0.1.10

### Patch Changes

- 09b3e5e: Fixed parsing (react updated its format)
- Updated dependencies [09b3e5e]
  - @rsc-parser/core@0.1.10

## 0.1.9

### Patch Changes

- ab6c252: Fix zip path for release upload
- Updated dependencies [ab6c252]
  - @rsc-parser/core@0.1.9

## 0.1.8

### Patch Changes

- d77eb98: Add id
- Updated dependencies [d77eb98]
  - @rsc-parser/core@0.1.8

## 0.1.7

### Patch Changes

- 6050c00: Change publish logic
- Updated dependencies [6050c00]
  - @rsc-parser/core@0.1.7

## 0.1.6

### Patch Changes

- d32eda1: Test release
- Updated dependencies [d32eda1]
  - @rsc-parser/core@0.1.6

## 0.1.5

### Patch Changes

- 6593bb5: Don't run CI workflow on pushes to main
- Updated dependencies [6593bb5]
  - @rsc-parser/core@0.1.5

## 0.1.4

### Patch Changes

- b58d575: Test release

## 0.1.3

### Patch Changes

- 5ed8752: Continued setting up changesets
- Updated dependencies [5ed8752]
  - @rsc-parser/core@0.1.3

## 0.1.2

### Patch Changes

- 4113fa7: Test release

## 0.1.1

### Patch Changes

- Bugs fixed:
  - When navigating for the first time, the "load event would sometimes be triggered #396
  - Messages from all tabs are accepted by all devtools panels #151
