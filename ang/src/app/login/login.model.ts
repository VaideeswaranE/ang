// src/app/login/models/login.model.ts
export class Login {
    constructor(
      public AdminName: string,   // Required parameter comes first
      public Password: string,    // Required parameter comes second
      public AdminId?: number     // Optional parameter comes last
    ) {}
  }
  