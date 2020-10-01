---
title: Search for boosts
---
Query time boosts allow matches on certain parts of the query to influence the score more than others.

All query elements can be boosted: terms, phrases, exact terms, expanded terms, proximity (only in filed groups), ranges, and groups.

```bash
term^2.4
"phrase"^3
term~0.8^4
=term^3
~term^4
cm:name:(big * yellow)^4
1..2^2
[1 TO 2]^2
yellow AND (car OR bus)^3
```