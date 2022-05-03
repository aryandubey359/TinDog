const tindogPWA = "tindog-pwa-v1"
const assets = [
  "/",
  "/index.html",

  //CSS files
  "css\styles.css",

    // JS files
  "js\app.js",
  
  // Images files
  "images\bizinsider.png",
  "images\dog-img_144x144.png",
  "images\dog-img_512x512.png",
  "images\dog-img.jpg",
  "images\dog2-img.jpg",
  "images\iphone6.png",
  "images\lady-img.jpg",
  "images\mashable.png",
  "images\TechCrunch.png",
  "images\tnw.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(tindogPWA).then(cache => {
      cache.addAll(assets)
    })
  )
})


self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })

  self.addEventListener("push", event => {
    let message = event.data.json();
  
    switch(message.type) {
      case "init":
        doInit();
        break;
      case "shutdown":
        doShutdown();
        break;
    }
  }, false);
  



  self.addEventListener('sync', event => {
    if (event.tag === 'my-tag-name') {
        event.waitUntil(doTheWork());
    }
});