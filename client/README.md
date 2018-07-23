#Prospect Scout

## Where to put files

- The App component can be found in /src/index.js
- The main routes are found in /src/app/index.js. For top-level components, you
  will need to add a route there to allow navigation to your component.
- The /src/components folder contains components that came with the Jumbo theme,
  so we generally leave all of them unmodified to keep the theme components intact,
  with a few expections noted below.
- Our project components should be placed in the /src/\_C57 folder. If your
  component has tightly-related child components, you should place your component
  in a folder with the main component name, and the related files should be placed
  inside the folder (like /src/\_C57/Pogs/\*), with index.js as the file containing the
  main component. However, if your component is a single file, it can be placed
  directly in the /src/\_C57 folder, like /src/\_C57/SamplePage.js
- Your services for making AJAX calls should be placed in the /src/services folder
  and named <kebab-cased-singular-entity-name>.service.js
- To add your component to the main router, you will need make an entry in
  the /src/app/index.js file similar to the ones that are already there. Note that
  the application loads top-level components asynchronously, so the imports are done
  in the <Route> instances.
- To add a main menu item to the side nav bar, you will need to edit the
  /src/containers/SideNav/SidenavContent.js file to add an entry similar to the
  existing NavLinks for Pogs, etc.

==== Notes below here came with the theme ===

#### For change theme color

######update app color
open src/style/global/\_variable.scss
update app color`$app-primary and $secondary` variable value

######update sidebar color

open src/style/global/\_variable.scss
update following variables
`$sidebar-bg, $sidebar-text-color, $sidebar-bg-darken, $sidebar-hover-color`
