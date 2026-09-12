---
title: "Web APIs, Networking & SQL"
description: "Notes on HTTP, DNS, CORS, browser debugging, APIs, networking, and SQL."
topic: "Web Development"
order: 12
featured: false
draft: false
---

## HTTP

HTTP is the request/response protocol used by the web.

A request includes things such as:

- method (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- URL
- headers
- optional body

A response includes:

- status code
- headers
- body

## Status codes

Common groups:

- `2xx` success
- `3xx` redirect
- `4xx` client/request problem
- `5xx` server problem

A status code is evidence about where a failure occurred.

## Headers

Headers carry metadata such as:

- content type
- authorization
- caching
- origin/CORS information

## DNS

DNS translates names such as `example.com` into network addresses.

When a website fails, "the internet is broken" is too broad. The problem could be DNS, routing, TLS, HTTP, application code, or the server itself.

## CORS

CORS is a browser security mechanism controlling whether one origin is allowed to access resources from another.

A CORS error is not automatically an API bug. It often means the browser is enforcing a server-defined cross-origin policy.

## Browser DevTools

Useful places to inspect:

- Console
- Network tab
- request/response headers
- response payloads
- timing
- status codes

## Postman / API clients

Testing an API outside the browser helps separate API behavior from browser-specific concerns such as CORS or front-end state.

## SQL

SQL is used to query relational data.

Core concepts to practice:

- `SELECT`
- `WHERE`
- `ORDER BY`
- `GROUP BY`
- joins
- inserts/updates
- schema relationships

The important skill is translating a question about data into a precise query.

## Debugging web requests

Useful sequence:

```text
what request was sent?
→ did DNS/network connection work?
→ what status came back?
→ what headers came back?
→ what body came back?
→ how did the application handle it?
```

## Main lesson

Web debugging becomes easier when I separate transport, HTTP, browser policy, server behavior, and application state instead of treating them as one system.
