## Brief Overview

A Google Chrome extension built for AdQ. It checks whether or not a webpage is
using AdQ scripts and acquires various data from that webpage.

Includes the following functions:

- Changes toolbar icon accordingly: green=yes, red=no, yellow=non-webpages
- Displays the following information in a popup page when icon is clicked:
  - Number of ad frames:
  - Has advertiser script:
  - Has publisher script:

## Important Files:

### background

Responsible for changing icons

### findScript

Get string HTML, finds publisher and append scripts, and returns iframe elements.

Speaks to background, addScript and adFrame files.
