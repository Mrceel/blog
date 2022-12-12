import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "关于", icon: "profile", link: "/intro.html" },
  // {
  //   text: "博文",
  //   icon: "edit",
  //   prefix: "/zh/posts/",
  //   children: [
  //     { text: "樱桃", icon: "edit", link: "cherry" },
  //     { text: "火龙果", icon: "edit", link: "dragonfruit" },
  //     "tomato",
  //     "strawberry",
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "note",
  //   link: "https://vuepress-theme-hope.github.io/v2/zh/",
  // },
]);
