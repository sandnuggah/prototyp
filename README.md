# Prototyp

`npm install` and `npm start` both projects.

## Room for improvements

- Handle remove upload in a sensible way (i.e fetch a new upload so we always have 5 items in the state)
- Validate all data sent to routes and coerce into types when possible.
- Pagination
  - ~Support for pagination in API~
  - Add pagination in webapp
- Edit
  - ~Support for PUT requests in API~
  - Add Edit form in webapp
- Get proxy url from process.env.PROXY_URL, in setupProxy.js
