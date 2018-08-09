import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'recordFilter'
})
export class AttendanceFilterPipe implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if(!items) return [];
    if(!searchText) return items;

return items.filter( record => {     
    return record.employee.id == searchText ||  record.id == searchText;
    });
   }
}