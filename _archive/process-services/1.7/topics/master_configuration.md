# Cluster master configuration

For each cluster, a *master configuration* can be defined. When the instance boots up, it will request the master configuration data from the Administrator application. For this to work, the *cluster.x* properties \(or equivalent programmatic setters\) listed above need to be set correctly.

There is one additional property that can be set: *cluster.master.cfg.required=*. This is a boolean value, which if set to *true* will stop the instance from booting up when the Admin app could not be reached or no master configuration is defined. In case of *false*, the instance will boot up using the local properties file instead of the master configuration.

The master configuration works for both clusters of embedded Process Engines or Alfresco Process Services instances. The two can not be mixed within the same cluster though.

Note: When changing the master configuration, the cluster instances would need a reboot. The Administrator application will show a warning for that node too in the *monitoring* tab, saying the master configuration currently being used is incorrect.

**Parent topic:**[Installing Alfresco Process Services Administrator](../topics/installing_administrator.md)

