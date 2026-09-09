// Insufficient Memory, runtime settings
//   index.html        the piece: live globe flights, landing on Google Earth and Street View stills
//   index_stills.html stills only, crossfades, no globe
//   index_globe.html  globe only, no stills
// stills:   'stills_web' (1920 px wide, website) or 'stills' (full resolution, gallery)
// fade:     crossfade length in ms.   flight: multiplier on flight time (1 = brisk, 1.5 = unhurried, 2 = slow)
// groundFade: how early in the descent the Street View picture starts fading in (fraction of the descent still to go).
//             0.4 = the fade is complete while the camera is still settling; higher is sooner
// groundFadeMs: how long that crossfade takes (ms)
// autoplay: seconds per stop for an unattended gallery loop (0 = off; a touch pauses it for a minute)
// tiles:    'remote' streams the flight imagery from USGS; 'local' uses the tiles/ mirror made by mirror_tiles.py (offline)
// travel:   stills edition only: 'map' | 'black' | 'cross'
window.IM_CONFIG = { stills: 'stills_web', fade: 1200, flight: 1.5, groundFade: 0.4, groundFadeMs: 650, autoplay: 0, tiles: 'remote', maxZoom: 19, travel: 'map' };
