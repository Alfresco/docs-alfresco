# Process Engine event listeners

It is possible to listen to events fired by the Process Engine. By default \(and if enabled\) there is a listener that captures these events, processes them before sending them to Elasticsearch \(which is used for analytics\). If the event data should be going somewhere else, for example an external BI warehouse, the following interface should be implemented and can be used to execute any logic when the event is fired.

See the *example apps* folder that comes with Alfresco Process Services. It has a *jdbc-event-listener* folder, in which a Maven project can be found that captures these events and stored them relationally in another database.

**interface**: com.activiti.service.runtime.events.RuntimeEventListener

**Maven module**: activiti-app-logic

All implementations exposing this interface will be injected into the process engine at run time.

Example:

```
package com.activiti.extension.bean;

import com.activiti.service.runtime.events.RuntimeEventListener;
import org.activiti.engine.delegate.event.ActivitiEvent;

@Component
public class PostgresEventListener implements RuntimeEventListener {

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void onEvent(ActivitiEvent activitiEvent) {
        // TODO: handle event here
    }

    @Override
    public boolean isFailOnException() {
        return false;
    }
}
```

**Parent topic:**[Hook points](../topics/hook_points.md)

