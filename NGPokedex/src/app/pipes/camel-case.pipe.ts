import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(input: string): string {
    if (!input) {
      return ''
    } else {
    	return input.charAt(0).toUpperCase() + input.slice(1)
    }
  }

}
