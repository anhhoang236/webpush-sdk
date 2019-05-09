var domain = "https://api.pushdi.com/application/";

self.addEventListener("install", function(i) {
  console.log('sw installed')
    self.skipWaiting()
}), self.addEventListener("push", function(i) {
  var push_data;
  if (i.data) {
    console.log('Push event with data')
    push_data = JSON.parse(i.data.text())
  } else {
    console.log('Push event but no data')
  }
  if (push_data){
    self.registration.showNotification(push_data.title, {
      body: push_data.content,
      // requireInteraction: true,
      data: push_data.data
    }).then(function(i) {
      console.log(i)
    });
  }
}), self.addEventListener("notificationclose", function(i) {
  console.log('notificationclose')
}), self.addEventListener("notificationclick", function(i) {
  console.log('notificationclick')
  var e = i.notification.data.url,
      o = i.notification.data.nid,
      k = i.notification.data.aid;
  i.notification.close();
  if (e){
    i.waitUntil(
      clients.openWindow(e)
    );
  }
  if (o){
    fetch(domain + k + "/notification/" + o + "/track")
  }
});
self.addEventListener('activate', function(a) {
  console.log('sw activated')
    a.waitUntil(clients.claim())
});

function urlBase64ToUint8Array(a) {
    const b = '='.repeat((4 - a.length % 4) % 4),
        c = (a + b).replace(/\-/g, '+').replace(/_/g, '/'),
        d = self.atob(c),
        f = new Uint8Array(d.length);
    for (let g = 0; g < d.length; ++g) f[g] = d.charCodeAt(g);
    return f
}