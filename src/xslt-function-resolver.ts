import { XsltFunctions } from './xslt-functions';
import { FunctionResolver } from 'xpath-ts';

export const xsltFunctionResolver = new FunctionResolver();

xsltFunctionResolver.addFunction('', 'document', XsltFunctions.document);
xsltFunctionResolver.addFunction('', 'format-utc', XsltFunctions.formatUtc);
