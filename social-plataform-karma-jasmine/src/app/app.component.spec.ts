import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should hvae a defined title', () => {
    const component = new AppComponent();
    expect(component.title).toBeDefined();
  });

  it('should have title defined equal social-plataform', () => {
    const component = new AppComponent();
    expect(component.title).toEqual('social-plataform');
  });
});
