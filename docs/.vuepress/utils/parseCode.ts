import { loopWhile } from 'deasync'
import * as sass from 'sass'
import less from 'less'
import { parse } from '@vue/compiler-sfc'
import { transpileModule, ScriptTarget, ModuleKind } from 'typescript'
import babel from '@babel/core'

export default function parseCode(code: string, type: string): ({ type: string, code: string }) | null {
  switch (type) {
    case 'html':
    case 'css':
      return { type, code: enCode(code) }
    case 'js':
    case 'javascript':
      return { type: 'js', code: enCode(code) }
    case 'ts':
    case 'typescript':
      return { type: 'js', code: enCode(tsToJs(code)) }
    case 'scss':
    case 'sass':
      return { type: 'css', code: enCode(sassToCss(code)) }
    case 'less':
      return { type: 'css', code: enCode(lessToCss(code)) }
    case 'vue':
      return { type, code: enCode(transformVueStyle(code)) }
    case 'tsx':
    case 'jsx':
      return { type: 'react', code: enCode(tsxToJs(code)) }
  }

  return null
}

function enCode(code: string) {
  return encodeURIComponent(code)
}

/**
 * 把 sass 代码转换为 css 代码
 * @param code sass 代码
 * @returns css 代码
 */
function sassToCss(code: string) {
  return sass.compileString(code).css.toString()
}

/**
 * 把 less 代码转换为 css 代码
 * @param code less 代码
 * @returns css 代码
 */
function lessToCss(code: string) {
  let result: any
  less.render(code, (e, res) => {
    if (e) {
      console.error(e)
      result = e
    } else if (res) {
      result = res.css
    } else {
      console.error('less render result is empty')
      result = 999
    }
  })
  loopWhile(() => !result)
  return result
}

/**
 * 把 vue 文件中的 style 标签中的 sass/scss/less 代码转换为 css 代码
 * @param code vue 文件代码
 * @returns 转换后的 vue 文件代码
 */
function transformVueStyle(code: string) {
  const { descriptor } = parse(code)  

  if (Array.isArray(descriptor.styles) && descriptor.styles.length) {
    for (const style of descriptor.styles) {
      if (!['sass', 'scss', 'less'].includes(style.lang as string)) {
        continue
      }

      try {
        let css: string = ''
        if (['sass', 'scss'].includes(style.lang as string)) {
          css = sassToCss(style.content)
        } else if (style.lang === 'less') {
          css = lessToCss(style.content)
        }

        // 把 css 代码替换原来的 sass/scss/less 代码
        code = code.split(style.content).join('\n' + css)
        // 删除 lang 属性
        code = code.replace(new RegExp(`\\s+lang=["']${style.lang}["']`), '')
      } catch (e) {
        console.error(e)
        continue
      }
    }
  }

  return code
}

/**
 * 把 ts 代码转换为 js 代码
 * @param code ts 代码
 * @returns js 代码
 */
function tsToJs(code: string) {
  return transpileModule(code, {
    compilerOptions: {
      target: ScriptTarget.ESNext,
      module: ModuleKind.ESNext
    }
  }).outputText
}

/**
 * 把 tsx 代码转换为 js 代码
 * @param code tsx 代码
 * @returns js 代码
 */
function tsxToJs(code: string) {
  const jsCode = babel.transform(code, {
    filename: 'app.tsx',
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-react',{ runtime: 'classic', pragma: 'React.createElement' }]
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs',
      () => ({
        visitor: {
          CallExpression(path: any) {
            if (path.node.callee.name === 'require' && path.node.arguments[0].value === 'react') {
              path.replaceWithSourceString('React')
            }
          }
        }
      })
    ]
  })

  return jsCode?.code || ''
}

