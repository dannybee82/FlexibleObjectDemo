# FlexibleObjectDemo

Demo project. Add custom properties to flexible object.

See images at the root-directory for examples.

Angular 22 (with [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0) + daisyUI/Tailwind CSS.

## Installation + run app

**Angular 22** needs a **Node.js** version of at least _22.22.3_

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

**Command to run the Vitest tests:**

_ng test_

And to see the _Vitest Code Coverage_ in action:

_npm run coverage_

### **Changelog:**

_June 2026_

\- Upgrade to _Angular 22_ and upgraded other packages.

\- Migrated _@Injectable_ to _@Service_.

\- Using the default: _ChangeDetectionStrategy.OnPush_ in stead of _ChangeDetectionStrategy.Eager_.

\- Using the latest file naming conventions.

\- Various changes in the templates.

_November 2025_

\- Upgrade to _Angular 21_ and upgraded other packages.
*   Removed deprecated _Karma_ and installed _Vitest._
*   Migrated _Jasmine_ tests to _Vitest_ tests (command: **ng generate refactor-jasmine-vitest**).
*   Adapted the tests to _Vitest_, e.g. replaced _fakeAsync()_ with _vi.useFakeTimers()_, _tick(ms)_ with _vi.advanceTimersByTime(ms)_, etc.

\- Removed _Bootstrap 5_ and replaced this with _Tailwind CSS/daisyUI_.

\- Removed _Bootstrap icons_ and replaced this with _@heroicons/react_.

\- Migrated application to _Zoneless_ (No use of _Zone.js_ and removed all references).

\- Various other changes.

_June 2025_

\- Upgrade to Angular 20. 

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Various changes and use of more _signals_.

\- Suppressing deprecation warnings of _Bootstrap_ in _angular.json_ with the code:

`"stylePreprocessorOptions": {`  
`"sass": {`  
`"silenceDeprecations": ["mixed-decls", "color-functions", "global-builtin", "import"]`  
`}`  
`},`