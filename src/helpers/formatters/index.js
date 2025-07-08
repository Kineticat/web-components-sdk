import Boolean from './Boolean';
import Currency from './Currency';
import { getLocale } from './common';

export default {
  ...Boolean,
  ...Currency
};

export function format(value, type, options) {
  let formattedValue;

  switch (type?.toLowerCase()) {
    case 'currency': {
      const defaultOptions = {
        locale: getLocale(),
        position: 'before',
        decPlaces: 2
      };
      const params = { ...defaultOptions, ...options };
      formattedValue = Currency.Currency(value, params);
      break;
    }

    case 'decimal': {
      const defaultOptions = { locale: getLocale(), decPlaces: 2 };
      const params = { ...defaultOptions, ...options };
      formattedValue = Currency.Decimal(value, params);
      break;
    }

    case 'integer': {
      const defaultOptions = { locale: getLocale() };
      const params = { ...defaultOptions, ...options };
      formattedValue = Currency.Integer(value, params);
      break;
    }
    case 'boolean':
    case 'checkbox': {
      formattedValue = Boolean.TrueFalse(value, { allowEmpty: false });
      break;
    }

    default:
      formattedValue = value;
  }
  return formattedValue;
}
