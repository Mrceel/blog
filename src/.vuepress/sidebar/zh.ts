import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "creative",
    //   prefix: "guide/",
    //   link: "guide/",
    //   children: "structure",
    // },
    "intro",
    // "slides",
  ],
  "/posts/jimi/" : "structure",
  "/posts/javascript/" : "structure",
  "/posts/java/" : "structure",
  "/posts/css/" : "structure",
  "/posts/node/" : "structure",
  "/posts/python/" : "structure",
  "/posts/react/" : "structure",
  "/posts/vue/" : "structure",
  "/posts/webpack/" : "structure",
  "/posts/zx/" : "structure",
});
