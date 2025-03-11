import React from 'react';
import JsonView from '@uiw/react-json-view';
import { nordTheme } from '@uiw/react-json-view/nord';
import ReactDOM from 'react-dom/client';
import {
  Typeson,
  arraybuffer,
  bigintObject,
  bigint,
  blob,
  date,
  cloneable,
  cryptokey,
  dataview,
  domexception,
  dommatrix,
  dompoint,
  domquad,
  domrect,
  error,
  file,
  filelist,
  imagebitmap,
  imagedata,
  infinity,
  map,
  nan,
  negativeInfinity,
  negativeZero,
  promise,
  primitiveObjects,
  regexp,
  set,
  typedArraysSocketio,
  typedArrays,
  undef,
} from 'typeson-registry'

const parseTypes = ['symbol', 'regexp']
class MusiParse {
  constructor(key, data) {
    Object.defineProperty(this, 'key', {
      writable: false,
      enumerable: false,
      configurable: false,
      value: key
    })
    Object.defineProperty(this, 'data', {
      writable: false,
      enumerable: false,
      configurable: false,
      value: data
    })
  }

  // 原始数据转成json-viewr可以展示的形式（一般是 string、number、boolean、null、undefined）等
  static toString(data) {
    switch (true) {
      case typeof data === 'symbol':
        return data.toString()
      case data instanceof RegExp:
        return data.toString()
    }
    return ''
  }

  // stringify 当前数据
  static stringify(data) {
    return JSON.stringify({
      id: 'kingmusi',
      key: MusiParse.getKeyByData(data),
      data: MusiParse.toString(data)
    })
  }

  // 根据 stringify 生成的字符串生成一个实例
  static parse(s) {
    const data = JSON.parse(s)
    if (data.id !== 'kingmusi') {
      throw new Error('Invalid data')
    }
    return new MusiParse(data.key, data.data)
  }

  // 根据数据类型获取 key
  static getKeyByData(data = this.data) {
    switch (true) {
      case typeof data === 'symbol':
        return 'symbol'
      case data instanceof RegExp:
        return 'regexp'
      default:
        return ''
    }
  }

  // 获取展示的颜色变量
  get colorVar() {
    switch (this.key) {
      case 'symbol':
        return 'float'
      case 'regexp':
        return 'int'
      default:
        return 'string'
    }
  }
}

const typeson = new Typeson().register([
  arraybuffer,
  bigintObject,
  date,
  bigint,
  cloneable,
  blob,
  cryptokey,
  dataview,
  domexception,
  dommatrix,
  dompoint,
  domquad,
  domrect,
  error,
  file,
  filelist,
  imagebitmap,
  imagedata,
  infinity,
  map,
  nan,
  negativeInfinity,
  negativeZero,
  promise,
  primitiveObjects,
  regexp,
  set,
  typedArraysSocketio,
  typedArrays,
  undef,
  // 特殊处理 symbol，让 symbol 显示为字符串，以便在 json-viewer 中扩展显示
  parseTypes.reduce((acc, type) => {
    acc[type] = [
      (x) => MusiParse.getKeyByData(x) === type,
      (x) => MusiParse.stringify(x),
      (x) => MusiParse.parse(x)
    ]
    return acc
  }, {})
])
// 提供给外界使用
function jsonParse(s) {
  const parsed = JSON.parse(s)
  return typeson.revive(parsed)
}
function jsonStringify(obj) {
  return JSON.stringify(typeson.encapsulate(obj))
}
window.jsonParse = jsonParse
window.jsonStringify = jsonStringify

class ReactJsonViewer extends HTMLElement {
  constructor() {
    super();
    this._root = ReactDOM.createRoot(this);
    const data = JSON.parse(this.getAttribute('data') || '{}');
    this._data = jsonParse(jsonStringify(data));
  }

  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'data') {
      this._data = jsonParse(newVal);
      this._render();
    }
  }

  _render() {
    this._root.render(<JsonView
      value={this._data}
      displayObjectSize={false}
      style={{
        ...nordTheme,
        padding: '8px',
        borderRadius: '4px',
      }}
    >
      {/** 特殊值不展开 */}
      <JsonView.Ellipsis render={({}, { value }) => {
        for (const key of parseTypes) {
          if (value instanceof MusiParse && value.key === key) {
            return <span style={{ color: `var(--w-rjv-type-${value.colorVar}-color)` }}>{value.data}</span>
          }
        }
        return <span />
      }}/>
      {/** 特殊值没有左括号 */}
      <JsonView.BraceLeft render={({}, { value }) => {
        for (const key of parseTypes) {
          if (value instanceof MusiParse && value.key === key) {
            return <span style={{ color: `var(--w-rjv-type-${value.colorVar}-color)`, opacity: '0.75', paddingRight: '4px' }}>{value.key}</span>
          }
        }
        return <span className="w-rjv-curlybraces-start" style={{ color: 'var(--w-rjv-curlybraces-color, #236a7c)' }}>{`{`}</span>
      }} />
      <JsonView.BraceRight render={({}, { value }) => {
        for (const key of parseTypes) {
          if (value instanceof MusiParse && value.key === key) {
            return <i />
          }
        }
        return <span className="w-rjv-curlybraces-end" style={{ color: 'var(--w-rjv-curlybraces-color, #236a7c)' }}>{`}`}</span>
      }} />
    </JsonView>);
  }
}

customElements.define('json-viewer', ReactJsonViewer);
