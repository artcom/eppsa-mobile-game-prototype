# EPPSA Mobile Game Prototype

## Development Setup

follow instructions by https://gist.github.com/jed/6147872
use `dev` instead of `$(whoami)`

for
`echo "address=/.$(whoami)/127.0.0.1" | sudo tee -a $(brew --prefix)/etc/dnsmasq.conf`
use actual network address instead of 127.0.0.1

add `no-dhcp-interface=en0` to dnsmasq.conf to make dns public
use dns in android devices

Client:

```
npm install
HTTPS=true npm run watch
```

Server:

```
npm run server
```
