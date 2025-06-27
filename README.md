<p align="center">
    <b>@li0ard/oms_barcode</b><br>
    <b>Декодер штрихкода полиса ОМС</b>
    <br>
    <a href="https://li0ard.is-cool.dev/oms_barcode">документация</a>
    <br><br>
    <a href="https://github.com/li0ard/oms_barcode/actions/workflows/test.yml"><img src="https://github.com/li0ard/oms_barcode/actions/workflows/test.yml/badge.svg" /></a>
    <a href="https://github.com/li0ard/oms_barcode/blob/main/LICENSE"><img src="https://img.shields.io/github/license/li0ard/oms_barcode" /></a>
    <br>
    <a href="https://npmjs.com/package/@li0ard/oms_barcode"><img src="https://img.shields.io/npm/v/@li0ard/oms_barcode" /></a>
    <br>
    <hr>
</p>

## Установка

```bash
npm i @li0ard/oms_barcode
```

## Использование

```ts
import { parse } from "@li0ard/oms_barcode"

let info = parse("020016E959AF0F3A6C9DB3A17503BF84E869B9C3BF39C3A175AA5341C3800000000000000000000000000000000000000000000000000000000000000283EB0000015CEA680D9CDDEF0209E9F91FFEA628328CD157144B634204BAC30F573FF2E1021BDC2A28B2DD50A2761E4CF75FFCDBFBA71EAFC548AD07D38DC82A7D674BD09A")
console.log(info) // {...}
```