const digitsStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"
              //   v       v       v       v       v       v       v       v      v
              //   0       8       16      24      32      40      48      56     63

const digits = digitsStr.split('');
const digitsMap:{[key:string]:number} = {};
for (var i = 0; i < digits.length; i++) {
    digitsMap[digits[i]] = i;
}

export const b64 = {
  encode: function(...int32s:number[]) {
    return int32s.map(int32 => {
      var result = '';
      while (true) {
          result = digits[int32 & 0x3f] + result;
          int32 >>>= 6;
          if (int32 === 0)
              break;
      }
      return result;
    }).join('')
  },
  decode: function(digitsStr:string):number {
    var result = 0;
    var digits = digitsStr.split('');
    for (var i = 0; i < digits.length; i++) {
        result = (result << 6) + digitsMap[digits[i]];
    }
    return result;
  }
}

export const confString = {
  encode: function(value:string, possible:string):string {
    let bin = possible.replace(new RegExp(`[${value.replace(/[^a-zA-Z0-9]/g,'')}]`, 'gi'), '1').replace(/[^1]/g, '0')
    return b64.encode(parseInt(bin,2)).padStart(b64.encode(2^possible.length).length, '0')
  },
  decode: function(value:string, possible:string):string {
    let log = `string: "${value}" | ${possible} = `
    let val = b64.decode(value)
      .toString(2)
      .padStart(possible.length,'0')
      .split('')
      .map((v,i) => {
        return v === '1' ? possible[i] : ''
      })
      .join('');
    // console.log(`${log}"${val}"`)
    return val
  }
}

export const confBoolean = {
  encode: function(...values:boolean[]):string {
    return b64.encode(parseInt(values.reverse().map(v => v ? 1 : 0).join(''), 2))
  },
  decode: function(number:string):boolean[] {
    let log = `boolean: "${number}" = `
    let val = b64.decode(number).toString(2).split('').reverse().map(v => (v === '1')  ? true : false)
    // console.log(`${log}"${val}"`)
    return val
  }
}

export const confNumber = {
  encode: function(...values:(number|false|undefined)[]) {
    return values.map(v => {
      if (v === false || typeof v === 'undefined') return b64.encode(63)
      if (v > 62) throw new Error('Numbers in configuration must be 62 or less.')
      return b64.encode(v)
    }).join('')
  },
  decode: function(number:string):number|undefined {
    let log = `number: "${number}" = `
    let val = b64.decode(number)
    // console.log(`${log}"${val}"`)
    return val === 63 ? undefined : val
  }
}
