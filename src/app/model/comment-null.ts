import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullCommentPipe'
})
export class CommentNull implements PipeTransform {

  transform(value) {
    return value == null || value == undefined ? 'No Comment' : value;
  }

}
