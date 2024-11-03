import { UAParser } from 'ua-parser-js';

export const generateDeviceFingerprint = (): string => {
  const parser = new UAParser();
  const result = parser.getResult();
  
  const components = [
    result.browser.name,
    result.browser.version,
    result.os.name,
    result.os.version,
    result.device.vendor,
    result.device.model,
    window.screen.height,
    window.screen.width,
    new Date().getTimezoneOffset()
  ];
  
  return btoa(components.join('|'));
};