import { SdkConfigAccess } from '@pega/auth/lib/sdk-auth-manager';

export class Utils {
  static lastControlID = 0;

  static getUniqueControlID(): string {
    const sPrefix = 'control-';

    this.lastControlID++;

    return sPrefix + this.lastControlID.toString();
  }

  static getSDKStaticContentUrl() {
    const sdkConfigServer = SdkConfigAccess.getSdkConfigServer();

    // NOTE: Needs a trailing slash! So add one if not provided
    if (!sdkConfigServer.sdkContentServerUrl.endsWith('/')) {
      sdkConfigServer.sdkContentServerUrl = `${sdkConfigServer.sdkContentServerUrl}/`;
    }

    return `${sdkConfigServer.sdkContentServerUrl}constellation/`;
  }

  static getOptionList(configProps: any, dataObject: any): any[] {
    const listType = configProps.listType;
    let arReturn: any[] = [];

    if (listType) {
      switch (listType.toLowerCase()) {
        case 'associated':
          // data source should be an array
          if (typeof configProps.datasource === 'object') {
            arReturn = configProps.datasource;
          }
          break;
        case 'datapage':
          // get data page
          // eslint-disable-next-line no-case-declarations
          const dataPage = configProps.datasource;
          if (typeof dataPage === 'string' && dataObject[dataPage]) {
            alert('need to handle data page');
          } else {
            let listSourceItems = configProps.listOutput;
            if (typeof dataPage === 'object' && !Array.isArray(listSourceItems)) {
              listSourceItems = dataPage.source ? dataPage.source : [];
            }
            (listSourceItems || []).forEach(item => {
              item.value = item.text ? item.text : item.value;
            });
            arReturn = listSourceItems || [];
          }

          break;

        default:
          break;
      }
    }

    return arReturn;
  }

  static getInitials(userName: string): string {
    let userInitials = userName;

    if (userName && userName !== '') {
      userInitials = userName.charAt(0);

      if (userName.lastIndexOf(' ') > 0) {
        const lastName = userName.substring(userName.lastIndexOf(' ') + 1);
        userInitials += lastName.charAt(0);
      } else if (userName.lastIndexOf('.') > 0) {
        const lastName = userName.substring(userName.lastIndexOf('.') + 1);
        userInitials += lastName.charAt(0);
      }
    } else {
      userInitials = '';
    }

    return userInitials.toUpperCase();
  }

  static getImageSrc(name: string, serverUrl: string): string {
    let iconName = name.replace('pi-', '').replace('pi ', '').trim();
    if (iconName === 'line-chart') {
      iconName = 'chart-line';
    }

    return this.getIconPath(serverUrl).concat(iconName).concat('.svg');
  }

  static getIconPath(serverUrl: string): string {
    // Directory in the constellation folder where the icons will be
    return serverUrl.concat('icons/');
  }

  static getBooleanValue(inValue: any): boolean {
    let bReturn = false;

    if (typeof inValue === 'string') {
      // Experiment with having "" be true, too (and "on")
      if (inValue.toLowerCase() === 'true' || inValue.toLowerCase() === 'on' || inValue === '') {
        bReturn = true;
      }
    } else {
      bReturn = inValue;
    }

    return bReturn;
  }

  static getIconFromFileType(fileType): string {
    let icon = 'document-doc';
    if (!fileType) return icon;
    if (fileType.startsWith('audio')) {
      icon = 'audio';
    } else if (fileType.startsWith('video')) {
      icon = 'video';
    } else if (fileType.startsWith('image')) {
      icon = 'picture';
    } else if (fileType.includes('pdf')) {
      icon = 'document-pdf';
    } else {
      const [, subtype] = fileType.split('/');
      const foundMatch = sources => {
        return sources.some(key => subtype.includes(key));
      };

      if (foundMatch(['excel', 'spreadsheet'])) {
        icon = 'document-xls';
      } else if (foundMatch(['zip', 'compressed', 'gzip', 'rar', 'tar'])) {
        icon = 'document-compress';
      }
    }

    return icon;
  }

  static getIconForAttachment(attachment) {
    let icon;
    switch (attachment.type) {
      case 'FILE':
        icon = this.getIconFromFileType(attachment.mimeType);
        break;
      case 'URL':
        icon = 'chain';
        break;
      default:
        icon = 'document-doc';
    }
    return icon;
  }

  static getTagName(lionTagName) {
    const TAGS_MAP = {
      INPUT: 'INPUT',
      TEXTAREA: 'TEXTAREA',
      COMBOBOX: 'SELECT',
      CHECKBOX: 'checkbox',
      RADIO: 'radio'
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const key in TAGS_MAP) {
      if (lionTagName.includes(key)) return TAGS_MAP[key];
    }

    return lionTagName;
  }

  static isObject(objValue) {
    return objValue && typeof objValue === 'object' && objValue.constructor === Object;
  }
}

export default Utils;
