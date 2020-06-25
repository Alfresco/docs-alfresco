---
title: Tabs
---

This page is for testing tabbed content. 


{% capture content3 %}
Hello this is the first tab
{% endcapture %}

{% capture content4 %}
Hello this is the second tab
{% endcapture %}

{% include tabs.html tab3="First" content4=content4 tab4="Second" content3=content3  %}
