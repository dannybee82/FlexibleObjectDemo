# FlexibleObjectDemo

Demo project. Add custom properties to flexible object.

See images at the root-directory for examples.

Angular 20 (with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1) + Bootstrap 5.

## Installation + run app

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

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