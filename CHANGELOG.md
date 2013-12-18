# v0.1.1 (18th of December 2013)

This release improves the module sub-generator.

* Fixed: Use the generated module's name as argument in test-spec `define` callback
* Fixed: Add test-spec in `test/spec.js`
* Fixed: Name the suite after the module (`describe('modulename', function () {})`);
* Fixed: Don't include any tests in test spec
* Fixed: Don't add content of example module in new JS file
* Fixed: Add current date and author name in header

# v0.1.0

## Features
This release comes with three sub-generators.

* `init:module` to scaffold AMD modules with a test spec file
* `init:jqueryplugin` to scaffold jQuery plugins
* `init:page` to scaffold page snippets for INITs static page generator

