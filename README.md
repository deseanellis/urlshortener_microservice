Free Code Camp | URL Shortener Microservice
=========================

This microservice shortens URL to a friendly format for easier transmission. 
You will receive an ID as a response that can then be appended to the URL and once entered within your browser you will be redirected to your website.
The return format is JSON.

How to Use
-------------
Access the API via /api/shortener/

Append your complete URL (http/https included) to the API endpoint.

`https://mellow-raft.glitch.me/api/shortener/https://www.google.com`

Returns
-------------
You will then receive a JSON response with the shortened URL.

`{
"shortURL": "https://mellow-raft.glitch.me/6391",
"redirectsTo": "https://www.google.com"
}`

Developed by DeSean Ellis - Free Code Camp