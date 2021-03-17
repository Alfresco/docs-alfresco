---
author: [Alfresco Documentation, Alfresco Documentation]
---

# AuditService

The API by which applications can query the audit logs and enable or disable auditing.

|Information|AuditService|
|-----------|------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The AuditService API provides faciities to query audit data. There are also methods to clear audit data, enable and disable auditing, and check auditing status.|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/audit/AuditService.html)|
|Java example|```

                  
    /**
     * Returns content changes.
     */
    public ObjectList getContentChanges(Holder<String> changeLogToken, BigInteger maxItems)
    {
        final ObjectListImpl result = new ObjectListImpl();
        result.setObjects(new ArrayList<ObjectData>());

        EntryIdCallback changeLogCollectingCallback = new EntryIdCallback(true)
        {
            @Override
            public boolean handleAuditEntry(Long entryId, String user, long time, Map<String, Serializable> values)
            {
                result.getObjects().addAll(createChangeEvents(time, values));
                return super.handleAuditEntry(entryId, user, time, values);
            }
        };

        Long from = null;
        if ((changeLogToken != null) && (changeLogToken.getValue() != null))
        {
            try
            {
                from = Long.parseLong(changeLogToken.getValue());
            }
            catch (NumberFormatException e)
            {
                throw new CmisInvalidArgumentException("Invalid change log token: " + changeLogToken);
            }
        }

        AuditQueryParameters params = new AuditQueryParameters();
        params.setApplicationName(CMIS_CHANGELOG_AUDIT_APPLICATION);
        params.setForward(true);
        params.setFromId(from);

        int maxResults = (maxItems == null ? 0 : maxItems.intValue());
        maxResults = (maxResults < 1 ? 0 : maxResults + 1);

        auditService.auditQuery(changeLogCollectingCallback, params, maxResults);

        String newChangeLogToken = null;
        if (maxResults > 0)
        {
            if (result.getObjects().size() >= maxResults)
            {
            	StringBuilder clt = new StringBuilder();
                newChangeLogToken = (from == null ? clt.append(maxItems.intValue() + 1).toString() : clt.append(from.longValue() + maxItems.intValue()).toString());
                result.getObjects().remove(result.getObjects().size() - 1).getId();
                result.setHasMoreItems(true);
            }
            else
            {
                result.setHasMoreItems(false);
            }
        }

        if (changeLogToken != null)
        {
            changeLogToken.setValue(newChangeLogToken);
        }

        return result;
    }
                  
                  
               
```

|
|More Information|-   [Audit platform extension point documentation](dev-extension-points-audit.md).
-   [Auditing Alfresco](../concepts/audit-intro.md) in the Alfresco Administration documentation provides a detailed overview of Auditing in Alfresco.

|
|Tutorials|-   [Audit API Hints and Tricks](https://www.youtube.com/watch?v=_aP_JYTwZ6Y) DevCon presentation by Mehdi Belmekki.
-   [Audit and Reporting with Alfresco and NoSQL by Zaizi](http://www.slideshare.net/zaiziltd/scale-audit-reporting-with-a-nosql-architecture)
-   [Audit tutorials](../concepts/audit-tutorials.md)

|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

