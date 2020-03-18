

class UIService {
  addEventListeners() {
    window.addEventListener('popstate', this.onpopstate)
  }

  removeEventListeners() {
    window.removeEventListener('popstate', this.onpopstate)
  }

  onpopstate(event: any) {
    const reload = window.confirm("Are you sure?");
    if (reload === true) {
      history.back();
    }
    history.pushState(null, null, window.location.pathname);
  }
}

export default UIService;