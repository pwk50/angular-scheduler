import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {

  /**
   * If your grouping property is an object (i.e, date.start), then specify both the parent and child property otherwise just the parent.
   */
  transform(objArr: any[], parent: string, child: string): any[] {
    return objArr.reduce(function (acc, obj) {
      let key = child ? obj[parent][child] : obj[parent];
      let exist = acc.find((r) => r && r.key === key);
      if (exist) {
        exist.values.push(obj);
      } else {
        acc.push({ key: key, values: [obj] });
      }
      return acc;
    }, []);
  }

}
