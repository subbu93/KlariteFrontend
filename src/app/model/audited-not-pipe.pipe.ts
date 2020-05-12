import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auditedNotPipe'
})
export class AuditedNotPipePipe implements PipeTransform {

  transform(value) {
    return value ? 'Audited' : 'Not Audited';
  }

}
