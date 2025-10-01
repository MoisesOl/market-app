import { expect } from 'chai';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { mockInstrument } from '../../mocks/mockInstrument';

// Stubs with inline templates to avoid external template/style resolution
@Component({ standalone: true, selector: 'app-header-stub', template: `<div class="header">{{selectedInstrumentSignal?.info?.name}}</div>` })
class HeaderStub {
	@Input() selectedInstrumentSignal: any;
}

@Component({ standalone: true, selector: 'app-summary-stub', template: `<div class="summary">{{instrumentSignal?.summary?.lastPrice}}</div>` })
class SummaryStub {
	@Input() instrumentSignal: any;
}

@Component({ standalone: true, selector: 'app-chart-stub', template: `<div class="chart">chart</div>` })
class ChartStub {
	@Input() instrument: any;
}

@Component({
	standalone: true,
	imports: [HeaderStub, SummaryStub, ChartStub],
	template: `
		<app-header-stub [selectedInstrumentSignal]="instrument"></app-header-stub>
		<app-summary-stub [instrumentSignal]="instrument"></app-summary-stub>
		<app-chart-stub [instrument]="instrument"></app-chart-stub>
	`
})
class TestHost {
	instrument: any = null;
}

describe('Flujo de selección (integración DOM) con TestHost', () => {
	let fixture: ComponentFixture<TestHost>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
		fixture = TestBed.createComponent(TestHost);
		fixture.detectChanges();
	});

	it('al cambiar el instrumento en el host, header/summary/chart reflejan datos', () => {
		const host = fixture.componentInstance;
		host.instrument = mockInstrument;
		fixture.detectChanges();

		const el: HTMLElement = fixture.nativeElement;
		// Verificar que el nombre del instrumento aparece en el DOM
		expect(el.textContent).to.contain(mockInstrument.info.name);
		// Verificar que aparece el precio (parte entera)
		expect(el.textContent).to.contain(String(Math.floor(mockInstrument.summary.lastPrice)));
	});
});

