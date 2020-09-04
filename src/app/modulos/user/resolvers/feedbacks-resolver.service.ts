import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { FeedbackService } from 'src/app/shared/service/feedback.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksResolverService implements Resolve<any> {

  constructor(private feedbackService: FeedbackService) { }

  resolve() {
    return this.feedbackService.getAllByUsers();
  }
}
