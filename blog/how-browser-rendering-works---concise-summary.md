---
title: How browser rendering works - concise summary
description: A concise explanation of the processes involved in browser rendering from the client url navigation to server interaction, parsing and then rendering.
published: true
readTime: 3
seo:
  keywords:
    - browser rendering
    - browser rendering process
    - how browser parses html
    - browser parses html to generate dom
    - how browser parses and constructs a webpage
    - how browser work
category:
  - browser
  - frontend
  - dom
image:
  source: https://images.unsplash.com/photo-1544449464-e8cab52594a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80
  alt: google chrome browser on an ipad
publishedDate: July 17, 2022
lastModifiedDate: July 17, 2022
---

If you are curious about how browsers work or want to quickly prepare for your frontend interview 👀 then you have come to the right place. This article is basically from my notepad where I summarized the process of browser rendering while I was studying it myself. I felt it will be better to make it an article where I can easily find it for reference and also share with you. Alright, let's get straight to business.

## Navigation
### DNS Lookup
This happens the first time a client navigates to a certain domain. The browser requests a DNS lookup and the server responds with an IP address which will likely be cached for a certain duration so that subsequent requests will be faster.
### TCP Handshake
Once the IP address is known, the browser sets up a connection via a [TCP-three way handshake](https://developer.mozilla.org/en-US/docs/Glossary/TCP_handshake) and this technique is often referred to as "SYN, SYN-ACK, ACK"(SYNchronize, SYNchronize-ACKnowledgement, and ACKnowledge). This is done so that computers that want to communicate can negotiate the parameters of connection before transmitting data such as HTTP browser requests.
> The host, generally the browser, sends a TCP SYNchronize packet to the server. The server receives the SYN and sends back a SYNchronize-ACKnowledgement. The host receives the server's SYN-ACK and sends an ACKnowledge. The server receives ACK and the TCP socket connection is established.

### TLS Negotiation
[TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS) negotiation is another handshake for establishing secure connection. This determines which cipher will be used to encrypt the communication, verifies the server and establishes that a secure connection is in place before beginning the actual data transfer.
## Response
Once secure connection has been established, the browser makes a HTTP GET Requests and the response for this initial requests contains the first byte of data received.  
**TIME TO FIRST BYTE (TTFB)** - This is the time between when the user made the request and the receipt of the first packet of HTML which is usually 14kb of data.
## Parse
The browser turns the data it receives over the network into DOM and CSSOM which is used by renderer to paint a page on the screen.
### Building the DOM tree
The browser parses the HTML mark up by tokenization and builds the DOM tree. The tokens include opening and closing tags, attribute names and values. The browser keeps parsing the HTML even when it sees non-blocking resources like an image or CSS file but pauses parsing when it sees script tags without an async or defer attribute.
### Preload Scanner
This is an optimization feature that reduces blockages by retrieving resources in the background so that by the time the HTML parser reaches the requested assets, it may have already been in flight or downloaded
### Building the CSSOM
The browser converts the CSS rules into a map of styles by going through each rule set in the CSS, creating a *tree of nodes* with parent, child and sibling relationship based on the CSS selectors. 
> Accessibility Object Model(AOM): the browser also builds an accessibility tree that assistive devices use to parse and interpret content. AOM is like a semantic version of the DOM.

## Render
### Style
The DOM tree and CSSOM tree are combined into a render tree then used to compute the layout of visible elements.
### Layout
This is the process by which the width, height and location of the nodes in the render tree are determined, as well as the size and position of objects on the page.
### Paint
The browser converts each box calculated in the layout phase to pixels on the screen drawing visual parts of an element like text colors, borders, shadows etc.

## Reference
- MDN Docs - [Populating the page: how browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)

### Connect
If you would like to connect with me, I'm available on;
- Discord: `brunoelo#8120`
- Twitter: [BrunoElo](https://twitter.com/brunoelo)