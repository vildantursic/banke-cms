import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FiltersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(item => {
      console.log(item);
      return item.type == args[0] ? item : null
    });
  }

}

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.sort((a: any, b: any) =>
      new Date(a.created_at).getDate() - new Date(b.created_at).getDate()
    );
  }
}
