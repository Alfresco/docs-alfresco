# Login/LogoutListener

**interface**: com.activiti.api.security.LoginListener and com.activiti.api.security.LogoutListener

**Maven module**: activiti-app-logic

An implementation of this class will get a callback when a user logs in or logs out.

Example:

```
package com.activiti.extension.bean;

@Component
public class MyLoginListener implements LoginListener {

        private static final Logger logger = LoggerFactory.getLogger(GfkLoginListener.class);

        public void onLogin(User user) {

                logger.info("User " + user.getFullName() + " has logged in");

        }

}
```

**Parent topic:**[Hook points](../topics/hook_points.md)

