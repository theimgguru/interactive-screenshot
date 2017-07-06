# Interactive Screenshot

Interactive screenshot is a small yet powerful Node.js module allowing you to take screenshots with ease!
It was originally created for [The Image Guru's screenshot app](#) but can easily be used on many other projects!
It's licensed under GPL-3.0 so many open source projects can use it! Syntax is simplex and uses promises.

For example, the following code saves a screenshot to `/screenshot.png`
```JS
let interactiveScreenshot = require("interactive-screenshot")

interactiveScreenshot.capture().then(function(stream) {
  let write = fs.createWriteStream("/image.png")
  stream.pipe(write)
}).catch(function(err) {
  console.log(err)
})
```
