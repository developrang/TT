import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( emp => {
      return emp.firstName.toLowerCase().includes(searchText) ||
      emp.lastName.toLowerCase().includes(searchText) ||
      emp.emailId.toLowerCase().includes(searchText) || 
      emp.id == searchText;
    });
   }
}