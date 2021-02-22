# Applying Service Packs and Hot Fixes

Alfresco provides an Update Assistant to help you apply Service Packs or Hot Fixes to your current Alfresco release.

The Update Assistant gives you the flexibility of applying current Service Packs or Hot Fixes to Alfresco, without the need to reinstall.

The Update Assistant runs from the command line, and is included in the package that contains your Service Pack or Hot Fix. It can be downloaded from the [Alfresco Support Portal](http://support.alfresco.com).

Before running the Update Assistant, you must ensure that you have:

-   A full, validated backup of your Alfresco repository before running the Update Assistant. This includes the Alfresco configuration, database, content store, and indexes.
-   Stopped your Alfresco server.

The Update Assistant is available with Service Packs and Hot Fixes that you apply to 5.1 and later.

You can't use the Update Assistant to upgrade from one major or minor Alfresco version to another. For example, you can't upgrade from Alfresco One 5.0 to Alfresco One 5.1, but you can move from 5.1.0 to Service Pack 5.1.1. You can also move, for example, from 5.1.0 to Hot Fix 5.1.0.100.

You can apply only a newer Service Pack or Hot Fix than the one that is already installed. For example, you can't downgrade from 5.1.1 to 5.1.0, or from 5.1.0.100 to 5.1.0.99.

