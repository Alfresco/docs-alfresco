# Sample SQL for Alfresco Insight Zeppelin

Using Alfresco Insight Zeppelin you can create some reports with the following example SQL queries:

> **Note:** Alfresco Insight Zeppelin comes with a note and example reports, see [Alfresco Insight Zeppelin reports and notes](apache-zeppelin-dashboards-reports.md).

![](../images/hr.png)

**The number of documents in the repository**

```
Select count(*) as Documents from alfresco 
where TYPE='cm:content'
```

![](../images/hr.png)

**The amount of storage used in the repository**

```
Select sum(`cm:content.size`) as `Storage Used (bytes)` from alfresco
```

![](../images/hr.png)

**The amount of content created in the last 60 days**

```
Select cm_created_day, count(*) from alfresco 
where cm_created >= 'NOW/DAY-60DAYS' 
group by cm_created_day
```

![](../images/hr.png)

**The amount of new documents created by what user and for which site**

```
Select SITE, cm_creator, count(*) as total from alfresco 
where NOT cm_creator = 'System' 
group by SITE, cm_creator order by total desc
```

![](../images/hr.png)

**Parent topic:**[Search and Insight Engine SQL](../concepts/search-insight-engine-sql.md)

