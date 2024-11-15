# Vue 3 + Jest Test Setup Guide

This guide will help you set up a testing environment for a Vue 3 project using Jest. Follow these steps carefully to ensure everything works as expected.

## Prerequisites
- Node.js >= 14
- npm or yarn

## Step-by-Step Installation

1. **Initialize the Project**
   
   Make sure you have a Vue project set up. You can create one using Vue CLI or Vite.
   
   ```bash
   vue create my-vue3-project
   # OR using Vite
   npm create vite@latest my-vue3-project --template vue
   ```

2. **Navigate to Project Directory**
   
   ```bash
   cd my-vue3-project
   ```

3. **Install Dependencies**
   
   Install Jest and related packages for Vue 3.
   
   ```bash
   npm install --save-dev jest @vue/test-utils@next @vue/vue3-jest babel-jest @babel/preset-env
   ```

   > **Note**: Using `@next` ensures that you get the latest version of `@vue/test-utils` that supports Vue 3.

4. **Configure Babel**

   Create a `babel.config.js` file in the root of your project with the following content:

   ```js
   module.exports = {
     presets: [
       '@babel/preset-env'
     ]
   };
   ```

5. **Configure Jest**

   Create a `jest.config.cjs` file in the root of your project with the following content:

   ```js
   module.exports = {
     preset: '@vue/cli-plugin-unit-jest',
     testEnvironment: 'jsdom',
     transform: {
       '^.+\.vue$': '@vue/vue3-jest',
       '^.+\.js$': 'babel-jest'
     },
     moduleFileExtensions: ['js', 'vue'],
     testMatch: [
       '**/__tests__/**/*.spec.[jt]s?(x)',
       '**/tests/unit/**/*.spec.[jt]s?(x)'
     ]
   };
   ```

6. **Add Test Scripts**

   Open `package.json` and add the following script under `"scripts"`:

   ```json
   "scripts": {
     "test": "jest --passWithNoTests"
   }
   ```

7. **Create a Sample Test File**

   Create a folder structure like this:

   ```
   my-vue3-project/
     └── __tests__/
         └── unit/
             └── components/
                 └── HelloWorld.spec.js
   ```

   In `HelloWorld.spec.js`, add the following code:

   ```js
   import { mount } from '@vue/test-utils';
   import HelloWorld from '@/components/HelloWorld.vue';

   describe('HelloWorld.vue', () => {
     it('renders properly', () => {
       const wrapper = mount(HelloWorld, {
         props: { msg: 'Hello Jest' }
       });
       expect(wrapper.text()).toContain('Hello Jest');
     });
   });
   ```

8. **Run Tests**

   Finally, run your tests:

   ```bash
   npm run test
   ```

   If everything is set up correctly, the tests should pass without any errors.

## Common Issues

- **Dependency Conflicts**: If you encounter dependency resolution errors, try using `npm install --legacy-peer-deps`.
- **Vue Not Defined**: Ensure you're using `@vue/test-utils@next` and `@vue/vue3-jest` to properly support Vue 3.
- **Babel Config**: Ensure `babel.config.js` is correctly configured to avoid issues with transpiling.

## Folder Structure
- `__tests__/`: Contains all your unit and integration tests.
  - `unit/`: Unit tests for components and individual functions.
  - `integration/`: Integration tests for combining different modules or components.
- `components/`: Vue components.
- `views/`: Vue views if applicable.

## Additional Tips
- Always keep your dependencies updated.
- Make sure your tests are scoped properly within the correct directory for Jest to find them.

## Useful Links
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Vue Test Utils Documentation](https://next.vue-test-utils.vuejs.org/guide/)
- [Babel Documentation](https://babeljs.io/docs/en/)

## Conclusion
This guide should help you get started with testing in Vue 3 using Jest. If you still face issues, consider re-checking your configuration and version compatibility or consult the official documentation linked above.
