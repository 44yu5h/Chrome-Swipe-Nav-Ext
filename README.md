<div align="center">
  <img src="assets/logo.png"/>
</div>
<div id="toc" align="center"><ul style="list-style: none"><summary><h1>Swipe Navigation Gesture Extension</h1></summary></ul></div>

<div align="center" style="margin-top: 22px; margin-bottom:8px;">
  <a href="https://chromewebstore.google.com/detail/cakieojfddljnniobmeiaejblbfgdjhf">  <img src="https://developer.chrome.com/static/docs/webstore/branding/image/YT2Grfi9vEBa2wAPzhWa.png" style="height: 54px; width: 190px;"></a>
</div>

---

<div id="toc" align="center"><ul style="list-style: none"><summary><h2> This wasn’t just a problem—it was a taunt.<br> And I don’t take taunts lightly.</h2></summary></ul></div>

This extension is especially for people using Chrome on Linux whose "back/forward two-finger swipe navigation gesture" does not work. God that's a long thing to say

I love how it turned out though. Personally, I feel it's better than the native (obviously) and much more fun to use.

Spent a lot of time trying to build Gnome extension only to find Gnome only captures touchdown and touchup events from two-finger gestures. Swipe gestures (as scroll events) are handled by the app itself. Downloaded available Chrome extensions, but they were half baked and buggy. After a long week of programming in languages I didn't want to, built something far more polished and reliable.


# Features:
 1. Swipe back forth to navigate
 2. Quick on/off toggle button
 3. Customizability
    1. Arrow Size
    2. Sensitivity
    3. Arrow Fade Delay  
    4. Icon Travel Distance
    5. Select Custom Arrow Style
 4. **Upcoming** (if enough traction):
    1. Pull down to refresh (as in phones)
    2. Pinch to zoom
    3. Upload custom svg feat
    4. Certainly more icon styles


# Loving it? Let me know!
<div align="center">
<br>
<h3>Star the repo! :)</h3>
<h3>Leave a review on webstore!</h3>
  <a href="https://chromewebstore.google.com/detail/cakieojfddljnniobmeiaejblbfgdjhf">
    <img src="https://developer.chrome.com/static/docs/webstore/branding/image/YT2Grfi9vEBa2wAPzhWa.png" style="height: 58px; width: 190px;">
  </a>
<br>
</div>

## Not Loving it?

Create an [issue](https://github.com/44yu5h/chrome-swipe-nav-ext/issues). Feel free to drop feature requests as well.
<br>

# Contribute

Fork the repo, clone it, make changes, [test locally on Chrome](https://dev.to/ben/how-to-install-chrome-extensions-manually-from-github-1612), create an issue, and then submit a PR. Easy?

Please contribute to the repository to keep it updated and functional, unlike other unmaintained extensions.\
Be sure to **fork** the repository **rather than** downloading the ZIP file to make changes, so you can relay your changes later if need be.

# Screenshots

![1](screenshots/option-page.png)<br><br>
![2](screenshots/popup.png) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![3](screenshots/nope-swipe.gif)
![3](screenshots/arrow-swipe.gif)
![4](screenshots/run-swipe.gif)

# Info

Won't work on "New Tab" or any other Chrome-specific pages due to security restrictions. That’s just how all extensions work—don’t blame me\
Settings auto-save when changed. Refresh page to reflect changes

Credits for initial base goes to @[golopot](https://github.com/golopot/swipe-back)\
Taking over since it is not maintained anymore and has bugs.