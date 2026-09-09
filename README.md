# Insufficient Memory, stills edition

A version of insufficientmemory.org that does not depend on Google at runtime. Same structure as the
Google Earth project: an introduction, then for each of the 46 sites a story stop (aerial view,
Mavica photograph, narrative) followed by a street-level stop. 93 stops in all.

The aerial and street-level views are stills captured from Google Earth and Google Street View
(September 2026) at the exact cameras stored in the project's KML. Nothing loads from Google when
the piece runs; the folder is self-contained and works offline.

Files
- index.html          the piece: live globe flights between sites (CesiumJS over USGS public-domain
                      imagery), landing on the aerial view; the street stop descends toward the ground and
                      crossfades into the Google Street View still just before touchdown
- index_stills.html   stills only, crossfades between stops, no globe (lightest, works without a server)
- index_globe.html    globe only, no stills
- config.js           settings for both editions (see comments inside)
- stops.json          every stop: narrative HTML, camera, photo, still, hidden flag. Edit here.
- stops.js            generated from stops.json + photos.json by  python3 make_stops_js.py
- photos/             the Mavica photographs (58 frames) and overview_map.jpg used between sites
- photos.json         which photograph goes with which stop
- stills/             full-resolution captures (3360 px wide), for the gallery
- stills_web/         1920 px wide captures, for the website
- captures/           raw screenshots from capture.sh (browser chrome still on), plus capture.log
- capture.sh, capture_list.tsv, sv_frame.html   the capture pipeline (macOS + Chrome)
- crop_captures.py    turns captures/ into stills/ and stills_web/
- build_data.py       parses a Google Earth KML export into stops.json
- mirror_tiles.py     offline imagery mirror for the globe edition only

Run it on a Mac
- Double-click "Open Insufficient Memory.command" (if macOS blocks it: right-click, Open). It starts a
  local web server and opens http://localhost:8765/index.html
- Or in Terminal: cd into this folder, run  python3 -m http.server 8765  and open that address.
- The server matters: the globe engine's worker scripts are blocked from a double-clicked file.
  index_stills.html is the one edition that also opens straight from Finder.

Website
- Upload the folder to any static host (for example a subfolder of the seanfader.com site) and point
  insufficientmemory.org there. For the web, config.js should keep  stills: 'stills_web'.
- Embed elsewhere (Wix, Squarespace):
  <iframe src="https://insufficientmemory.org/" style="width:100%;height:85vh;border:0" allow="fullscreen"></iframe>
- Deep links: index.html#14 opens stop 14.

Gallery (ICA San Jose)
- In config.js set  stills: 'stills'  (full resolution) and, for an unattended loop,  autoplay: 25
  (seconds per stop; a visitor's touch pauses the loop for a minute). Run in a browser's kiosk or
  full-screen mode. For no internet at all, run  python3 mirror_tiles.py  once (flight imagery to disk,
  roughly 300 to 500 MB) and set  tiles: 'local'.

Pace
- flight in config.js scales every flight (1.5 = unhurried, the default; 2 = slow); fade sets the crossfades.
- The aerial views are the live globe, so visitors can drag and zoom there. While a Street View picture is
  showing, dragging or scrolling on it hands the globe back; the button at the bottom returns to the picture.
- The ground position (how low and how steep the descent ends) is set in streetToCamera() in index.html:
  height 40 m, pitch 24 degrees down, looking along the Street View heading.

Transitions (stills edition)
- travel: 'map' fades through the overview map with all the pins between sites (closest to Earth's
  pull-back-and-dive), 'black' fades through black, 'cross' crossfades directly. fade sets the length.
- photos/overview_map.jpg is a cropped screenshot of the Google Earth project; replace it with a cleaner
  capture any time (same filename).

Recapturing a still
- Delete the file in captures/ and stills/ and run  bash capture.sh  again (it skips what exists), then
  python3 crop_captures.py. capture_list.tsv holds the exact Earth and Street View URL for every stop.
  The Street View lines go through sv_frame.html because Google's embed only runs inside an iframe;
  keep the local server running while capturing.

Photos
- Where the folder held two frames for a site, the one chosen is listed here; to swap, change the
  filename in photos.json and run  python3 make_stops_js.py.
    Harold McCormick: mavica491 (alternate mavica469)
    Michael Fleming: mavica181 (alternate mavica169)
    John Carol Lloyd: MVC-015S (alternate MVC-006S, which is stored sideways)
    Jamie Ray Tolbert: MVC-022S (alternate MVC-010S)
    Steven Larry Wheeler: mavica263 (alternate mavica254)
    Billy Jean Lavette: Mavica099 (alternate Billy_Jean_Mavica086)
    Steen Fenrich: the 2020 retouched file (alternate the 1999 original)
- The introduction in the Google Earth version has a photograph of the Sony Mavica behind the text.
  Drop that file in photos/ and add  "Insufficient Memory": "<file>"  to photos.json to restore it.

Removed stops
- Seven pairs that are in the 2024 export but not in the live project are kept in stops.json with
  "hidden": true (Adam Colton, Pebbles, Robert Eads' hospice, the Toolbox, the Uptown Bookstore,
  The Connection, the Baton Club). Delete the flag to bring one back (it will need a capture).

Attribution
- Google's logo and data attribution remain in every still, as Google's guidelines ask for imagery
  used in films, print and artworks. The on-screen line reads: "Aerial and street views: Google Earth
  and Google Street View, captured September 2026 · Photographs: Sean Fader".
