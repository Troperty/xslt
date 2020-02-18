import fs from 'fs';
import { XPathContext, Expression, XNodeSet, XString } from 'xpath-ts';
import moment from 'moment-timezone';
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

  static formatUtc(c: XPathContext, ...args: Expression[]) {
    if (args.length < 2) {
      throw Error('invalid number of arguments');
    }
    const value = args[0].evaluate(c).stringValue;
    const timezone = args[1].evaluate(c).stringValue;
    return new XString(moment.tz(value, timezone).utc().format());
  }
}
