---
title: Sample Insight Zeppelin SQL
---

Using Alfresco Insight Zeppelin you can create some reports with the following example SQL queries:

> **Note:** Alfresco Insight Zeppelin comes with a note and example reports, see [Alfresco Insight Zeppelin reports and notes]({% link insight-engine/latest/config/note.md %}).

### The number of documents in the repository

```sql
Select count(*) as Documents from alfresco
where TYPE='cm:content'
```

### The amount of storage used in the repository**

```sql
Select sum(`cm:content.size`) as `Storage Used (bytes)` from alfresco
```

### The amount of content created in the last 60 days

```sql
Select cm_created_day, count(*) from alfresco 
where cm_created >= 'NOW/DAY-60DAYS' 
group by cm_created_day
```

### The amount of new documents created by what user and for which site

```sql
Select SITE, cm_creator, count(*) as total from alfresco 
where NOT cm_creator = 'System' 
group by SITE, cm_creator order by total desc
```
