#!/bin/bash

curl -sX POST \
 -H "Content-Type: application/json" \
 -d '{
  "write_url": "https://app-tsdb.last9.io/v1/metrics/1573534448a9ee5b0247b39118e527e6/sender/gmail-rockmiop/write",
  "username": "1e2d74b8-401c-4032-b11a-e2dd122dbb39",
  "password": "79f1cbc5d352dc8904e8bb23d16ddb63"
}' \
 https://app.last9.io/api/v4/organizations/gmail-rockmiop/clusters/setup