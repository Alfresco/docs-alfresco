---
title: Tabs
---

This page is for testing tabbed content. 


{% capture mac%}
* one
* two
* three
{% endcapture %}

{% capture windows %}
```sql
select * where 1=2
```
{% endcapture %}

{% capture linux %}
third set
{% endcapture %}


{% include tabs.html opt1="first one" opt2="second one"  opt3="third chance" content1=mac content2=windows content3=linux %}