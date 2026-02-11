export interface SteganographerOptions {
  zero?: string;
  one?: string;
  split?: string;
}

interface SteganographerConfig {
  zero: string;
  one: string;
  split: string;
}

export class Steganographer {
  config: SteganographerConfig;

  constructor(options: SteganographerOptions = {}) {
    // 默认映射表：使用零宽字符
    const defaults: SteganographerConfig = {
      zero: '\u200b', // Zero Width Space -> 代表二进制 0
      one: '\u200c',  // Zero Width Non-Joiner -> 代表二进制 1
      split: '\u200d' // Zero Width Joiner -> 代表字符分隔符
    };

    this.config = { ...defaults, ...options };
  }

  /**
   * 将普通字符串加密为不可见字符串
   * @param {string} text - 需要加密的明文
   * @returns {string} - 加密后的不可见字符串
   */
  encode(text: string): string {
    if (!text) return '';
    
    return text
      .split('')
      .map(char => {
        // 转为二进制
        const codePoint = char.codePointAt(0);
        if (codePoint === undefined) return '';
        const binary = codePoint.toString(2);
        // 替换 0 和 1 为对应的配置字符
        return binary
          .replace(/0/g, this.config.zero)
          .replace(/1/g, this.config.one);
      })
      .join(this.config.split); // 使用分隔符连接
  }

  /**
   * 将不可见字符串解密回普通字符串
   * @param {string} invisibleStr - 纯粹的不可见字符串（不含普通文字）
   * @returns {string} - 解密后的明文
   */
  decode(invisibleStr: string): string {
    if (!invisibleStr) return '';

    return invisibleStr
      .split(this.config.split)
      .map(encodedChar => {
        // 还原二进制
        const binary = encodedChar
          .replace(new RegExp(this.config.zero, 'g'), '0')
          .replace(new RegExp(this.config.one, 'g'), '1');
        
        // 处理空字符情况（防止解析错误）
        if (!binary) return '';
        
        // 二进制转回字符
        return String.fromCodePoint(parseInt(binary, 2));
      })
      .join('');
  }

  /**
   * 辅助工具：从一段混合文本中提取出加密的不可见片段
   * @param {string} mixedText - 包含普通文字和隐藏字符的文本
   * @returns {string} - 提取出的不可见字符串
   */
  extract(mixedText: string): string {
    if (!mixedText) return '';
    
    // 动态构建正则，匹配所有定义的特殊字符
    const chars = [this.config.zero, this.config.one, this.config.split]
      .map(c => `\\u${c.codePointAt(0)!.toString(16).padStart(4, '0')}`) // 转为正则unicode格式
      .join('|');
    
    const regex = new RegExp(`(${chars})+`, 'g');
    const matches = mixedText.match(regex);
    
    return matches ? matches.join('') : '';
  }
}