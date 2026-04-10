type ShowModalType = (message: string, type?: 'error' | 'success') => void;

class ErrorHandlerClass {
  private showModal: ShowModalType | null = null;

  register(fn: ShowModalType) {
    this.showModal = fn;
  }

  alert(message: string) {
    this.showModal?.(message, 'error');
  }

  success(message: string) {
    this.showModal?.(message, 'success');
  }
}

export const ErrorHandler = new ErrorHandlerClass();