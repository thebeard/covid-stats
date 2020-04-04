import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable()
export class FeedbackService {
  constructor(private Http: HttpClient) {}

  sendFeedback(email: string, name: string, subject: string, message: string): Promise<void> {
    const { apiUrl, assignee, pat, project, workspace } = environment.asana,
      headers = { Authorization: `Bearer ${pat}` },
      data = {
        name: `${subject} | ${name}`,
        assignee_status: 'upcoming',
        completed: false,
        html_notes: `<body>${message}\n\n<em>${email}</em></body>`,
        liked: false,
        notes: `${message}\n\n${email}`,
        assignee,
        followers: [assignee],
        projects: [project],
        workspace,
      };

    return this.Http.post<void>(`${apiUrl}/tasks`, { data }, { headers }).toPromise();
  }
}
