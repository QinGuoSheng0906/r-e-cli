/*
   css,less规范
   秦国胜
   2019-08-28
*/
module.exports = {
   plugins: [],
   extends: "stylelint-config-standard",                                      // 这是官方推荐的方式
   processors: [],
   ignoreFiles: [],                                                           // 忽略待定文件
   rules: {
      "unit-no-unknown": true,                                                // 禁止未知单位
      "unit-whitelist": ["em", "rem", "%", "s", "px", "deg", "reg"],          // 单位白名单
      "at-rule-empty-line-before": "always",                                  // 样式空行
      "no-eol-whitespace": true,                                              // 禁止行尾空格
      "color-no-invalid-hex": true,                                           // 禁止使用无效的十六进制颜色。
      "block-no-empty": true,                                                 // 禁止空块
      "comment-no-empty": null,                                               // 禁止空注释
      "number-no-trailing-zeros": null,                                       //
      "number-leading-zero": null,                                            // 小数部分小于或等于1的前导零
      "string-no-newline": true,                                              // 禁止在字符串中使用（未转义的）换行符。
      "keyframe-declaration-no-important": true,                              // 不允许!important在关键帧声明中使用。
      "no-empty-source": true,                                                // 禁止空来源
      "declaration-block-semicolon-space-before": "never",                    // 在声明块的分号之前需要一个空格或禁止空格
      "declaration-block-semicolon-space-after": "always-single-line",        // 声明块后的分号空格
      "block-opening-brace-space-before": "always-multi-line",                // 在块的大括号之前需要一个空格或不允许空格。
      "block-opening-brace-space-after": null,                                // 在块的大括号之后需要一个空格或不允许空格。
      "color-hex-case": "lower",                                              // 为十六进制颜色指定小写或大写
      "color-hex-length": "short",                                            // 指定十六进制颜色的短或长表示法
   },
   "css.validate": false,
   "less.validate": false,
   "scss.validate": false,
}
