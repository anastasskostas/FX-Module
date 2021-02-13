import config from '../config/config';
import { get, post } from './request';

import XMLData from './../utils/currencies.xml';
var XMLParser = require('react-xml-parser');

export const purchaseCurrency = (data) => {
  return post(`${config.baseUrl}${config.purchaseCurrencyEndpoint}`, data)
}

export const getCurrenciesData = () => {
  return get(XMLData).then((response) => {
    const xml = new XMLParser().parseFromString(response.data);

    const currencyRates = {};
    const currencies = [];
    currencies.push({ name: "EUR" })
    currencyRates["EUR"] = "1"
    xml.getElementsByTagName('Cube')[0].children[0].children.forEach((item) => {
      currencyRates[item.attributes.currency] = item.attributes.rate
      if (item.attributes.currency !== 'GBP') {
        currencies.push({ name: item.attributes.currency })
      }
    })

    return { currencyRates, currencies, time: xml.getElementsByTagName('Cube')[0].children[0].attributes.time }
  });
}