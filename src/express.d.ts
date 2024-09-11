declare global {
    namespace Express {
      interface Locals {
        db: any;
      }
    }
  }