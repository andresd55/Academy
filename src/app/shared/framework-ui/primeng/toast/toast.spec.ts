import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Toast, ToastItem } from './toast';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
    template: `
        <p-toast></p-toast>
    `
})
class TestToastComponent {
    constructor() { }

    showDefaultToast(severity) {
    }

    showWithKey(key) {
    }

    showMultipleToast() {
    }

    onClearWithKey(key) {
    }

    onClear() {
    }
}

describe('Toast', () => {

    let toast: Toast;
    let fixture: ComponentFixture<TestToastComponent>;
    let component: TestToastComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Toast,
                ToastItem,
                TestToastComponent
            ],
        });

        fixture = TestBed.createComponent(TestToastComponent);
        toast = fixture.debugElement.children[0].componentInstance;
        component = fixture.componentInstance;
    });

    it('should create container', () => {
        fixture.detectChanges();

        const toastContainer = fixture.debugElement.query(By.css('.p-toast'));
        expect(toastContainer.nativeElement).toBeTruthy();
    });

    it('should create success toast', () => {
        fixture.detectChanges();

        component.showDefaultToast('success');
        fixture.detectChanges();

        const toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("p-toast-message-success");
    });

    it('should close toast', () => {
        fixture.detectChanges();

        component.showDefaultToast('success');
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("p-toast-message-success");
        const closeEl = fixture.debugElement.query(By.css(".p-toast-icon-close"));
        toastMessage.nativeElement.dispatchEvent(new Event("mouseenter"));
        toastMessage.nativeElement.dispatchEvent(new Event("mouseleave"));
        closeEl.nativeElement.click();
        fixture.detectChanges();

        Promise.resolve(null).then(() => {
            toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
            expect(toastMessage).toBeFalsy();
        });

    });

    it('should create warn toast with key', () => {
        toast.key = "vv";
        fixture.detectChanges();

        component.showWithKey('vv');
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("p-toast-message-warn");
    });

    it('should clear toast', () => {
        fixture.detectChanges();

        component.showDefaultToast('success');
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("p-toast-message-success");
        component.onClear();
        fixture.detectChanges();

        Promise.resolve(null).then(() => {
            toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
            expect(toastMessage).toBeFalsy();
        });
    });

    it('should clear toast with key', () => {
        toast.key = "vv";
        fixture.detectChanges();

        component.showWithKey('vv');
        fixture.detectChanges();

        let toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("p-toast-message-warn");
        component.onClearWithKey('vv');
        fixture.detectChanges();

        Promise.resolve(null).then(() => {
            toastMessage = fixture.debugElement.query(By.css('.p-toast-message'));
            expect(toastMessage).toBeFalsy();
        });
    });

    it('should create multiple toast', () => {
        fixture.detectChanges();

        component.showMultipleToast();
        fixture.detectChanges();

        const toastMessage = fixture.debugElement.queryAll(By.css('.p-toast-message'));
        expect(toastMessage.length).toEqual(2);
    });
});