import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string, type: string = 'user' ): any {

    const url = URL_SERVICIES + '/img';

    if (!img || (type !== 'user' && type !== 'doctor' && type !== 'hospital')) {
      console.log('The image is null or the type dont exist');
      return url + '/users/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    return url + '/' + type + 's/' + img;

    // switch ( type ) {
    //   case 'user':
    //     url += '/user/' + img;
    //     break;
    //
    //   case 'doctor':
    //     url += '/doctor/' + img;
    //     break;
    //
    //   case 'hospital':
    //     url += '/hospital/' + img;
    //     break;
    //
    //   default:
    //     console.log('The type dont exist');
    //     return url + '/users/xxx';
    //
    // }
  }
}

