### 一、概念

`RSA` 加密算法是一种非对称加密算法

`RSA` 加密一般是**公钥加密私钥解密**，多用于**前台公钥**（后端给的）加密传参给后台，**后台私钥**解密。

使用 `RSA` 加密时需要用到 `jsencrypt`（一个基于 `rsa` 加解密的 `js` 库）

### 二、使用

`pnpm add jsencrypt`

```js
// 在vue中用这句没问题，但在react中用会报错，改一下引用的包
// import { JSEncrypt } from 'jsencrypt';
// 报错解决：https://github.com/travist/jsencrypt/issues/178
import Encrypt from 'jsencrypt/bin/jsencrypt.min.js';
/**
 * 加密
 * @param {String}  需要加密的参数
 */
export function passwordEncryption(param: string) {
  // 后台给的公钥
  let publicKey =
    'xxx';
  let encryptor = new Encrypt();
  encryptor.setPublicKey(publicKey);
  let passwordEncryp = encryptor.encrypt(param);
  //   console.log('加密成功', passwordEncryp);
  return passwordEncryp;
}

// 解密（前端一般用不到）
export function decrypt(msg: string) {
  const privateKey = '';
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  var decryptMsg = decrypt.decrypt(msg);
  //   console.log('解密成功', decryptMsg);
  return decryptMsg;
}
```
