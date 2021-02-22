---
author: Alfresco Documentation
---

# Role-based rendering

This tutorial demonstrates role-based rendering. With role-based rendering you can control the items that are displayed based on user groups.

Role-based rendering allows you to render a different UI depending on which groups the logged in user belongs to. All widgets can be configured with a set of `renderFilter` rules that determine whether or not the widget is rendered. Note, a rendered widget may or may not be visible. If the `renderFilter` does not pass, the widget will not be rendered. The rules are not constrained to just groups, it is possible to define rules for any property that the widget has access to. However, two key pieces of information are always cascaded through the widget hierarchy and these are `groupMemberships` and `currentItem`.

1.  Log into Share and create a new group called EXAMPLE.

2.  Create two new users. Add **one** of the users to the newly created group.

3.  In simple-page.get.js add the following code:

    ```
    
                            
    var warning = {
      name: "alfresco/header/Warning",
      config: {
        renderFilterMethod: "ALL",
        renderFilter: [
          {
            target: "groupMemberships",
            property: "GROUP_ALFRESCO_ADMINISTRATORS",
            renderOnAbsentProperty: true,
            values: [false]
          },
          {
            target: "groupMemberships",
            property: "GROUP_EXAMPLE",
            renderOnAbsentProperty: true,
            values: [false]
          }
        ],
        warnings: [
          {
            message: "You aren't in right group",
            level: 3
          }
        ]
      }
    };                        
                            
                        
    ```

    With this code the warning message will be displayed if the user in not an administrator or the user is not in the EXAMPLE group.

4.  You can now use role-based rendering for a menu. Add the following code to simple-page.get.js, after the code you already have:

    ```
    
                            
    var menuBar = {
      name: "alfresco/menus/AlfMenuBar",
      config: {
        renderFilterMethod: "ANY",
        renderFilter: [
          {
            target: "groupMemberships",
            property: "GROUP_ALFRESCO_ADMINISTRATORS",
            values: [true]
          },
          {
            target: "groupMemberships",
            property: "GROUP_EXAMPLE",
            values: [true]
          }
        ],
        widgets: []
      }
    };                        
                            
                        
    ```

    Notice that `values` is set to `true` rather than `false` as was the case in the previous code example. So, in this case, you will only see the menu if your are an administrator, or in the group EXAMPLE, or both.

5.  It is also possible to conditionally render menu items based on roles. Add the following code after the previous code:

    ```
    
                            
    menuBar.config.currentItem = {
      test: {
        value: "show"
      }
    };                        
                            
                        
    ```

    This code creates a custom currentItem object for the menu bar. You can then add specific menu items with the following code:

    ```
    
                            
    var menuBarItems = [
      {
        name: "alfresco/menus/AlfMenuBarItem",
        config: {
          label: "Should Appear",
            renderFilter: [
              {
                property: "test.value",
                values: ["show"]
              }
            ]
          }
        },
        {
          name: "alfresco/menus/AlfMenuBarItem",
          config: {
            label: "Should NOT appear",
            renderFilter: [
              {
                property: "test.value",
                values: ["visible"]
              }
            ]
          }
        }
    ];
    menuBar.config.widgets = menuBarItems;                        
                            
                        
    ```

    The default behavior is to check the `currentItem` object, so `target` is not required as it was previously. The second menu item should not be displayed.

6.  Add the final piece of code to create the JSON model for the page:

    ```
    
                            
    model.jsonModel = {
      widgets: [
        {
          name: "alfresco/layout/VerticalWidgets",
          config: {
            widgets: [ warning, menuBar ]
          }
        }
      ]
    };
    model.jsonModel.groupMemberships = user.properties["alfUserGroups"];                        
                            
                        
    ```

7.  Test that the above code works by logging in as administrator, a user in the EXAMPLE group, and a user who is not an administrator and not in the EXAMPLE group, and then testing if the message, menu, and menu items are displayed as expected. You can activate the script using `http://localhost:8081/share/page/dp/ws/simple-page` as before.


You have seen how rendering can be controlled based on user groups.

**Parent topic:**[Tutorials](../concepts/aikau-tutorials.md)

