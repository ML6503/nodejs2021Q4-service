/**
 * constructs DB Error exteneded from Error and add message for specific codes
 * @param statusCode - status code of the error
 * @param message - error's message
 *
 */
export class DBError extends Error {
  public statusCode: number;

  public message: string;

  constructor(statusCode: number, TheMessage: string) {
    super(TheMessage);
    this.statusCode = statusCode;
    this.message = TheMessage;

    if (statusCode === 400) {
      this.message = 'Bad request';
    }
    if (statusCode === 401) {
      this.message = 'Access token is missing or invalid';
    }
    if (statusCode === 403) {
      this.message = 'You are not authorized for that.';
    }
    if (statusCode === 404) {
      this.message = 'Object not found';
    } else {
      this.message = 'Something went wrong!';
    }
  }
}
