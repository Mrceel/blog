import { defineUserConfig } from "vuepress";
import { getDirname, path } from "@vuepress/utils";
import theme from "./theme.js";
import docsearchPlugin from "@vuepress/plugin-docsearch";
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",
  alias: {
    // "@theme-hope/modules/blog/components/BlogHome.js": path.resolve(
    //   __dirname,
    //   "./components/MyHomeFooter.js"
    // ),
    // "@M": path.resolve(__dirname, "./components/M.js"),
  },

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Mr.Ceel",
      description: "A blog demo for vuepress-theme-hope",
    },

    "/": {
      lang: "zh-CN",
      title: "Mr.Ceel",
      description: "vuepress-theme-hope 的博客演示",
    },
  },

  theme,
  plugins: [
    // docsearchPlugin({
    //   appId: "LDBQGQC8Q9",
    //   apiKey: "5c3a7145aeba231c3b85b742d24fc24f",
    //   indexName: "mrhope",
    //   locales: {
    //     "/": {
    //       placeholder: "搜索",
    //       translations: {
    //         button: {
    //           buttonText: "搜索",
    //           buttonAriaLabel: "搜索",
    //         },
    //         modal: {
    //           searchBox: {
    //             resetButtonTitle: "清除查询条件",
    //             resetButtonAriaLabel: "清除查询条件",
    //             cancelButtonText: "取消",
    //             cancelButtonAriaLabel: "取消",
    //           },
    //           startScreen: {
    //             recentSearchesTitle: "搜索历史",
    //             noRecentSearchesText: "没有搜索历史",
    //             saveRecentSearchButtonTitle: "保存至搜索历史",
    //             removeRecentSearchButtonTitle: "从搜索历史中移除",
    //             favoriteSearchesTitle: "收藏",
    //             removeFavoriteSearchButtonTitle: "从收藏中移除",
    //           },
    //           errorScreen: {
    //             titleText: "无法获取结果",
    //             helpText: "你可能需要检查你的网络连接",
    //           },
    //           footer: {
    //             selectText: "选择",
    //             navigateText: "切换",
    //             closeText: "关闭",
    //             searchByText: "搜索提供者",
    //           },
    //           noResultsScreen: {
    //             noResultsText: "无法找到相关结果",
    //             suggestedQueryText: "你可以尝试查询",
    //             reportMissingResultsText: "你认为该查询应该有结果？",
    //             reportMissingResultsLinkText: "点击反馈",
    //           },
    //         },
    //       },
    //     },
    //   },
    // }),
  ],
  shouldPrefetch: false,
});
