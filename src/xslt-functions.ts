import fs from 'fs';
import { XPathContext, Expression, XNodeSet } from 'xpath-ts';
import { getParser } from './install';

export class XsltFunctions {
  static document(c: XPathContext, ...args: Expression[]) {
    if (args.length !== 1) {
      throw Error('invalid number of arguments');
    }
    const documentUri = args[0].evaluate(c).stringValue;
    if (!fs.existsSync(documentUri)) {
      return new XNodeSet();
    }
    const documentString = fs.readFileSync(documentUri, 'utf8');
    const document = getParser().parseFromString(documentString, 'text/xml');
    const nodeset = new XNodeSet();
    nodeset.add(document);
    return nodeset;
  }
}
