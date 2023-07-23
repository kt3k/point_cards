# Deno KV example app

Start the project:

```
deno task start
```

## Ops

Create a user (Needs ADMIN_KEY env var set appropriately)

```sh
curl -i -X POST \
  -H "X-Admin-Key: a580f7ac-de9e-47a4-b012-d6588507a610" \
  -d '{"name": "ケイ", "login":"kei", "pw":"kei"}' \
  http://localhost:8000/api/admin_create_user
```

