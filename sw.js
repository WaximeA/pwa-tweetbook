/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "config.js",
    "revision": "553536075cb48d4c6017bd7f13ea106c"
  },
  {
    "url": "index.html",
    "revision": "a8049ab2be7a1b8d4d562420175a4c40"
  },
  {
    "url": "manifest.json",
    "revision": "87c871a7e0fb1a184d6500a97a02d5ad"
  },
  {
    "url": "src/components/data/TweetAuth.js",
    "revision": "b2cc229b5ecb90bf2a8351db2ddfef2f"
  },
  {
    "url": "src/components/data/TweetLogin.js",
    "revision": "6be53ba7ad41209d2a3e16472164ceab"
  },
  {
    "url": "src/components/data/TweetLogout.js",
    "revision": "34957ac880760afed96ac02c9f711115"
  },
  {
    "url": "src/components/data/TweetStore.js",
    "revision": "2bdeb8bb89ea21b4b02ca91c8fa224a9"
  },
  {
    "url": "src/components/layout/navigation/FormAdd.js",
    "revision": "fa39d88151e8e69428f3df4d590a947c"
  },
  {
    "url": "src/components/layout/navigation/FormEdit.js",
    "revision": "56600d98c6b86518e05c8b4e52ed6d47"
  },
  {
    "url": "src/components/layout/navigation/TweetHeader.js",
    "revision": "be289d9e68d12834e9331011b647b4c6"
  },
  {
    "url": "src/components/layout/navigation/TweetSidebar.js",
    "revision": "028758548efb3e9ff9ec29e284c57bf3"
  },
  {
    "url": "src/components/layout/navigation/UserInfo.js",
    "revision": "b89c439f941f5fdae6ff54b1e6e994fb"
  },
  {
    "url": "src/components/modules/InfosTweet.js",
    "revision": "f352c0dd7d05cd02fd644de793e49643"
  },
  {
    "url": "src/components/modules/Tweet.js",
    "revision": "54660df10f5a8db2714df4afac6bd31d"
  },
  {
    "url": "src/components/modules/Tweet/ButtonAction.js",
    "revision": "62dbe6f6cbdf0b05ccf00085367d3be8"
  },
  {
    "url": "src/components/modules/Tweet/Response.js",
    "revision": "86ceb7beea3b08705122b46206c948e9"
  },
  {
    "url": "src/components/TweetbookApp.js",
    "revision": "e933ebf3ae2cfc1bd1638dfd735209d7"
  },
  {
    "url": "src/Constants/collection.constant.js",
    "revision": "950acfe849ced63103f2dd1af2838dde"
  },
  {
    "url": "src/Constants/event.constant.js",
    "revision": "f8969faaa24b2f0d53f5337a2930d1d2"
  },
  {
    "url": "node_modules/wcomponent-check-connexion/dist-src/index.js",
    "revision": "ad5540d26c5178f34bba834667ab1533"
  },
  {
    "url": "node_modules/wcomponent-check-connexion/dist-src/index.min.js",
    "revision": "f347501736d4e6017ee4cf5acaaf2f1b"
  },
  {
    "url": "node_modules/wcomponent-check-connexion/dist-web/index.js",
    "revision": "376daf63da0c52ccac9d83a29ec6b82a"
  },
  {
    "url": "node_modules/wcomponent-check-connexion/dist-web/index.min.js",
    "revision": "8daefa5bd5ae652ead8f7da9a52eff3c"
  },
  {
    "url": "node_modules/lit-element/lib/css-tag.js",
    "revision": "88a7776dc45a2f5f5a2a99b144d49075"
  },
  {
    "url": "node_modules/lit-element/lib/decorators.js",
    "revision": "aa875a7b763b574cfce40b684b733eb3"
  },
  {
    "url": "node_modules/lit-element/lib/updating-element.js",
    "revision": "2276cf333bd0a08bd8ae34783f36aa4c"
  },
  {
    "url": "node_modules/lit-element/lit-element.js",
    "revision": "72433c8e2d5d81583b7af68bad4822d6"
  },
  {
    "url": "node_modules/lit-html/directives/async-append.js",
    "revision": "20e3f940ebfcbf1fd1c3ff930140478c"
  },
  {
    "url": "node_modules/lit-html/directives/async-replace.js",
    "revision": "7732ef7434ee0095decce950f416bff8"
  },
  {
    "url": "node_modules/lit-html/directives/cache.js",
    "revision": "8aa0c9b2096899239e163a0727362c6f"
  },
  {
    "url": "node_modules/lit-html/directives/class-map.js",
    "revision": "705fea9395aba0207801cf14bc7eb719"
  },
  {
    "url": "node_modules/lit-html/directives/guard.js",
    "revision": "ad09d68d2035c335d3be91e78a390ec7"
  },
  {
    "url": "node_modules/lit-html/directives/if-defined.js",
    "revision": "0b45cc46b88bc39118f14369e7f9141e"
  },
  {
    "url": "node_modules/lit-html/directives/repeat.js",
    "revision": "413d641cade88bf311fb981f99a7df8e"
  },
  {
    "url": "node_modules/lit-html/directives/style-map.js",
    "revision": "3bd01a6efbb203ea6ae703e40c870f76"
  },
  {
    "url": "node_modules/lit-html/directives/unsafe-html.js",
    "revision": "ff818bc767837badf6765e48c3903154"
  },
  {
    "url": "node_modules/lit-html/directives/until.js",
    "revision": "9e6a4ef8ddd3504145fba94d8f785212"
  },
  {
    "url": "node_modules/lit-html/lib/default-template-processor.js",
    "revision": "1e40120b6bdb1572392ddac4aa1963de"
  },
  {
    "url": "node_modules/lit-html/lib/directive.js",
    "revision": "17a7e2d5dce2eb7d746b0c315d28c181"
  },
  {
    "url": "node_modules/lit-html/lib/dom.js",
    "revision": "9ff3de7fa26d0da12961cadef215b332"
  },
  {
    "url": "node_modules/lit-html/lib/html.js",
    "revision": "95211c7c650709ee3951ed4620dd12b0"
  },
  {
    "url": "node_modules/lit-html/lib/modify-template.js",
    "revision": "19cd46629fac6601423169f538f5b5ba"
  },
  {
    "url": "node_modules/lit-html/lib/part.js",
    "revision": "ffd11b35ced31f865d8381f3585892df"
  },
  {
    "url": "node_modules/lit-html/lib/parts.js",
    "revision": "4fa1856b552720ca7fc250c28c1d415c"
  },
  {
    "url": "node_modules/lit-html/lib/render-options.js",
    "revision": "b135ca8c29cdf7d1e3d0761b692e1663"
  },
  {
    "url": "node_modules/lit-html/lib/render.js",
    "revision": "e22a39942d0d752076163c996cf8fc56"
  },
  {
    "url": "node_modules/lit-html/lib/shady-render.js",
    "revision": "a2fd899283a879992b77178a0d737775"
  },
  {
    "url": "node_modules/lit-html/lib/template-factory.js",
    "revision": "dcdc52b73ba1f464ece3387ab1ce1b8d"
  },
  {
    "url": "node_modules/lit-html/lib/template-instance.js",
    "revision": "585d96e993de72ae751008a8e899bd9f"
  },
  {
    "url": "node_modules/lit-html/lib/template-processor.js",
    "revision": "da7fb57119a10d43468d581552ceee39"
  },
  {
    "url": "node_modules/lit-html/lib/template-result.js",
    "revision": "9d76799b294c150f51b83f54e32e1176"
  },
  {
    "url": "node_modules/lit-html/lib/template.js",
    "revision": "54a2bf3e0fc541bfb99898ec3bc2f716"
  },
  {
    "url": "node_modules/lit-html/lit-html.js",
    "revision": "50f5d9fb44aa37c7a81feaff9bf6648c"
  },
  {
    "url": "node_modules/lit-html/polyfills/template_polyfill.js",
    "revision": "4a38be423d18651036104e6a871c9e20"
  },
  {
    "url": "src/assets/images/baseline_favorite_white_18dp.png",
    "revision": "22d7a28c33821a32dbf8ddb92f05a356"
  },
  {
    "url": "src/assets/images/icons/baseline_chat_white_18dp.png",
    "revision": "847dfdbb6775fad8839d1ca61b7cb8f3"
  },
  {
    "url": "src/assets/images/icons/baseline_create_white_18dp.png",
    "revision": "22a84899dba9c701aa8aac5ff5910f4c"
  },
  {
    "url": "src/assets/images/icons/baseline_favorite_border_white_18dp.png",
    "revision": "d8ec3635e3ced304ddd18792f3bcbbdf"
  },
  {
    "url": "src/assets/images/icons/baseline_favorite_white_18dp.png",
    "revision": "c88a71266516ebbecd75f395afba4e30"
  },
  {
    "url": "src/assets/images/icons/baseline_favorite_white_border_18dp.png",
    "revision": "22d7a28c33821a32dbf8ddb92f05a356"
  },
  {
    "url": "src/assets/images/icons/baseline_highlight_off_white_18dp.png",
    "revision": "df4acf566649a18086c93d373610612e"
  },
  {
    "url": "src/assets/images/icons/baseline_keyboard_backspace_white_18dp.png",
    "revision": "5d70fc2a32252f0df42e6b3a10eddb6c"
  },
  {
    "url": "src/assets/images/icons/baseline_menu_white_18dp.png",
    "revision": "634de346b2d87b8d1abc0b017c521c42"
  },
  {
    "url": "src/assets/images/icons/baseline_repeat_white_18dp.png",
    "revision": "dc1a096a4232fc9ffe602aa72d5d86d3"
  },
  {
    "url": "src/assets/images/icons/icon-128x128.png",
    "revision": "d149b988a5bba727ad89119afacf1012"
  },
  {
    "url": "src/assets/images/icons/icon-192x192.png",
    "revision": "c752e22c77c5649fd65c6f9349b41eee"
  },
  {
    "url": "src/assets/images/icons/icon-384x384.png",
    "revision": "e80cb596848d0bd7d1d5e3b18d7b47b3"
  },
  {
    "url": "src/assets/images/icons/icon-512x512.png",
    "revision": "b69e7a4dd16f97ef56c84a82198d3d4d"
  },
  {
    "url": "src/assets/images/icons/icon-72x72.png",
    "revision": "da09a29b25812ed44eb3e04c3af9f880"
  },
  {
    "url": "src/assets/images/icons/icon-96x96.png",
    "revision": "60c7c363c4ce759eb2dd529d9b50d0eb"
  },
  {
    "url": "src/assets/images/tweetbook_full.png",
    "revision": "4dbcadac107ba85681389597c67d8714"
  },
  {
    "url": "src/assets/images/tweetbook.png",
    "revision": "b065b494c96d957b729c40ccc12c455b"
  },
  {
    "url": "src/assets/images/user.svg",
    "revision": "b8b817a0479a778ef07f6757e7d3d846"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new workbox.strategies.CacheFirst({ "cacheName":"image-cache", plugins: [] }), 'GET');
